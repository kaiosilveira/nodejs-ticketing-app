# nodejs-ticketing-app

**This repo is a work in progress and is being updated regularly. Stay tuned for news**

This application is the result of a study on the usage of NodeJS child processes and how it compares to single-process execution in terms of performance and availability. The following sections will walk you through the thought process behind the study, from the formulation of an hypothesis until the analysis of the results and the conclusions drawn from that.

## Context

Imagine we are a ticketing platform, responsible for performing a `search` action across multiple train carriers, transforming and aggregating the different result structures and turning them into a universal, uniform model. For performance reasons, we want this search to be as much in parallel as possible, as the carriers do not share any dependencies between each other and the data transformation step is also particular to each carrier. We still need an aggregation step to join the results, though. And this part should be synchronized.

## Hypothesis

Considering the scenario above, a question is raised: does a child process approach bring any benefits in terms of performance and availability, when compared to a single in-process approach, as they will run in parallel and out of the main event loop, performing the operations at virtually the same time and also freeing "event-loop time" for new requests?

## Experiment structure


## Results

## Conclusion
