# nodejs-ticketing-app

**This repo is a work in progress and is being updated regularly. Stay tuned for news**

This application is the result of a study on the usage of NodeJS child processes and how it compares to single-process execution in terms of performance and availability. The following sections will walk you through the thought process behind the study, from the formulation of an hypothesis until the analysis of the results and the conclusions drawn from that.

## Context

Imagine we are a ticketing platform, responsible for performing a `search` action across multiple train carriers, transforming and aggregating the different result structures and turning them into a universal, uniform model. For performance reasons, we want this search to be as much in parallel as possible, as the carriers do not share any dependencies between each other and the data transformation step is also particular to each carrier. We still need an aggregation step to join the results, though. And this part should be synchronized.

## Hypothesis

Considering the scenario above, a question is raised: does a child process approach bring any benefits in terms of performance and availability, when compared to a single in-process approach, as they will run in parallel and out of the main event loop, performing the operations at virtually the same time and also freeing "event-loop time" for new requests?

## Application structure

This application is structured using a drill-down approach, where a top-level action is enriched and forwarded to each carrier. The search action, for instance, is first called at the top level `TicketingApp` module, which contains some environment setup and then a dispatch to each carrier for the specifics. On the way back, the results from each carrier are aggregated into a single, global result and handed back to the caller. To make matters fair for the experiment, the same code is used both for the in-process and the multi-process approaches, the latter only differing on the process-specifics setup.

## Experiment structure

An environment variable called `USE_CHILD_PROCESSES` was created to allow this app to decide, at bootstrap-time, which kind of search strategy should be used. The strategies being, of course, in-process or multi-process. As mentioned in the previous section, the same code is executed in both cases, only differing on a thin layer of process messaging configuration and synchronization for the multi-process variant.

There is another environment variable, called `USE_RANDOM_DELAY`, that is used to simulate latency when calling carriers. This variable was turned off to keep this delay out of the analysis. The value of `50ms` was standard latency time.

## Results

The results were pretty clear: the single-process approach wins. And this is probably because child processes are great as an alternative to handle CPU-heavy computations, but are too expensive for non CPU-intensive tasks, which is our case, as we have a more network-bound\* result times. See the detailed results below:

**Single process approach results:**

```
➜ loadtest -c 10 -n 100 'http://localhost:3001/search?origin=1000&destination=2000&date=\"2022-09-01\"'
[Thu Aug 11 2022 14:24:31 GMT+0100 (Western European Summer Time)] INFO Requests: 0 (0%), requests per second: 0, mean latency: 0 ms
[Thu Aug 11 2022 14:24:35 GMT+0100 (Western European Summer Time)] INFO Requests: 84 (84%), requests per second: 17, mean latency: 569.4 ms
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO Target URL:          http://localhost:3001/search?origin=1000&destination=2000&date=\"2022-09-01\"
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO Max requests:        100
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO Concurrency level:   10
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO Agent:               none
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO Completed requests:  100
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO Total errors:        0
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO Total time:          5.676769688 s
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO Requests per second: 18
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO Mean latency:        555.8 ms
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO Percentage of the requests served within a certain time
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO   50%      537 ms
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO   90%      708 ms
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO   95%      829 ms
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO   99%      886 ms
[Thu Aug 11 2022 14:24:36 GMT+0100 (Western European Summer Time)] INFO  100%      886 ms (longest request)
```

**Child process approach results:**

```
➜ loadtest -c 10 -n 100 'http://localhost:3000/search?origin=1000&destination=2000&date=\"2022-09-01\"'
[Thu Aug 11 2022 14:24:42 GMT+0100 (Western European Summer Time)] INFO Requests: 0 (0%), requests per second: 0, mean latency: 0 ms
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO Target URL:          http://localhost:3000/search?origin=1000&destination=2000&date=\"2022-09-01\"
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO Max requests:        100
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO Concurrency level:   10
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO Agent:               none
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO Completed requests:  100
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO Total errors:        0
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO Total time:          2.9606977889999997 s
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO Requests per second: 34
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO Mean latency:        293.4 ms
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO Percentage of the requests served within a certain time
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO   50%      294 ms
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO   90%      349 ms
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO   95%      391 ms
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO   99%      454 ms
[Thu Aug 11 2022 14:24:45 GMT+0100 (Western European Summer Time)] INFO  100%      454 ms (longest request)
```

\* For simplicity, network calls were simulated using a `setTimeout` instead, so we can control the latency times

## Conclusion

## Appendix: Technical notes

The maybe unfamiliar style of code used in this application is a result of the usage of the [pipeline-operator proposal](https://github.com/tc39/proposal-pipeline-operator), which allow us to write code as a sequence of statements, piping the result of one statement as the input of the next one.
