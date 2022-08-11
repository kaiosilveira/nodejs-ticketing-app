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

\* For simplicity, network calls were simulated using a `setTimeout` instead, so we can control the latency times

## Conclusion

## Appendix: Technical notes

The maybe unfamiliar style of code used in this application is a result of the usage of the [pipeline-operator proposal](https://github.com/tc39/proposal-pipeline-operator), which allow us to write code as a sequence of statements, piping the result of one statement as the input of the next one.
