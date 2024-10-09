# ISO KIT REST

The goal of this project is to provide a boilerplate isomorphic application for a REST API.
It is developed and maintained by [Kaung Htet Kyaw][kg] and follows the practices we believe in.

[kg]: https://github.com/Kaung-HtetKyaw

## Setup

You need first to install the project's dependencies

```bash
yarn install
```

Every service required by the project are already setup in both `docker-compose.yml` and `docker-compose.cpuv1.yml` (this is for the old cpu that cannot support latest minio image ).

However you need to bind your host ports for those services.

The default configuration is the following and to be placed in `docker-compose.override.yml`.

```yaml
version: '3.5'

services:
    redis:
        ports:
            - 6379:6379

    minio:
        ports:
            - 9000:9000
            - 9001:9001

    mongo:
        ports:
            - 27017:27017

    mongo-express:
        ports:
            - 8081:8081
```

Environment is already setup but may be changed at will (see the environment configuration section to know more about it).
Once you bound your ports with the docker compose override file, you may now start up the service.

```bash
docker-compose up -d
# or with the v2 client
docker compose up -d

#if you are on a device with old cpu
docker compose -f docker-compose.cpuv1.yml up -d

# you may then verify services are running and ports properly bound by executing
docker ps
```

You may now start the development server by executing

```bash
yarn dev
```

By default, webpack will use in-memory caching for development.
However, if you are low in memory, you may run with file-system caching by setting up `CACHE_MODE` to `filesystem`.

```bash
# by inlining the environment configuration
CACHE_MODE=filesystem yarn dev
# or using the shortcut/alias
yarn dev:fs
```

For building the project in local, only use

```bash
yarn build
```

for local builds.

For building the project in production environment or in CI/CD pipelines, please use

```bash
yarn build:prod
```

to upload the build folder to sentry for error tracing

## Commit convention

The [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) convention is used for this project.

Whenever the task is related to a **Jira** task, the scope of your task may be the Jira task ID.
Such as : `feat(afc-4242): add user list` (the scope should be lowercase).

## Pull Request convention

For this project, everything should go through a pull request to be merged on protected branches.

The rules to follow for pull requests

-   Proper title describing the changes
-   Add description or comments to feedback any useful information or context
-   Use merge by rebase for fixes or new features on `next`, use merge by commit when merging from `next` to `latest`
-   Assign reviewers to your pull request
-   Assign assignees to your pull request (most of the time probably yourself or anyone working on it)
-   Apply tags to specify what it is about
-   Apply milestones if applicable

## Branching

The `main` and `development` branches are protected.
The `development` branch holds the next versions (ongoing development) while the `main` holds the latest stable version (production ready).

When doing new developments you will need first to create a new branch dedicated to your changes.
After what you may create a Pull Request (PR) to request a merge of your work onto the `development` branch.
Only hot fixes may be requested for merge directly onto `main`.

When merging changes to `development` or hot fixes to `main` you should prefer merge by rebasing.

You may create draft pull requests on your early development, so that every developer can follow your work and provide early reviews.
Anyhow, everything must go through pull requests which requires the following to be merge on protected branches :

-   approval from at least one other developer
-   approval from the CI/CD pipelines (will be set up later on)

## Environment configuration

You may update application settings using environment files.

-   `.env`: Default.
-   `.env.local`: Local overrides. This file is loaded for all environments except test.
-   `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
-   `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

Files on the left have more priority than files on the right:

-   **`yarn dev`**: `.env.development.local`, `.env.development`, `.env.local`, `.env`
-   **`yarn build`**: `.env.production.local`, `.env.production`, `.env.local`, `.env`
-   **`yarn test`**: `.env.test.local`, `.env.test`, `.env` (notice that `.env.local` is missing)

These variables will act as the defaults if the machine does not explicitly set them.
