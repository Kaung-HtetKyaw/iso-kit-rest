# Architecture Overview

The purpose of this section is to briefly introduce an overview for the backend ;
to highlight the key actors/services.

## Summary

> As we speak, we do not have data operations layer yet

The main dependencies can be displayed as the following :

```mermaid
graph LR
	webApi[Web API]-->|Integrating|dataOps
	dataOps-->|Using|mysql
	webApi[Web API]-->|Using|redis[Redis]
```

-   The Web API is based on NodeJS and running Sequelize ORM.
-   The data operations require connections to one (or many) MySQL instances.


## Web API request flow

The simplest query could be described with the following flow :

```mermaid
sequenceDiagram
    participant client as Client
    participant webApi as Web API
    participant dataOps as Data Operations
    participant db as MySQL
    
    client->>webApi: Request over HTTP
	note over webApi: JWT extraction
	webApi-->>dataOps: Fetch authenticated user
	dataOps-->>db: Fetch from DB
	db-->>dataOps: Result
	note over webApi: Parse Query
	webApi->>client: Response
```

Whenever there is a `Authorization` header provide the JWT Token, this token will 
be parse and the user entity will be fetched from the database.
The web API does not have the capability to directly executes operations onto the database.
All operations (both read and write) are implemented in a package called `data-operations`.


## Asynchronous jobs

Asynchronous jobs are executed and organized by bulljs over redis as message broaker.

We can summarize the flow as the following :

```mermaid
sequenceDiagram
	participant client as Client
    participant webApi as Web API
    participant redis as Redis
    participant worker as Worker

	client->>webApi: Submit application
	note over webApi: Process Query
	webApi-->>redis: Dispatch job
	webApi->>client: Response
	redis-->>worker: Consume job
	note over worker: Execute Job
	worker-->>redis: Update job status
```
