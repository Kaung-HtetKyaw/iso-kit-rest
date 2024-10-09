# ISO-KIT-REST

The goal of this project is to provide a strong and efficient starter to quickly start developments on new projects. We welcome all feedback and
contributions.

To access the documentation you must have [docsify] installed on your system.

```bash
# use npm
npm i docsify-cli -g
# or yarn
yarn global add docsify-cli
```

then simply run

```bash
# you may replace the port by another of your choosing
# if not defined it will use the port 3000
# which may get it conflict with the application itself
docsify serve docs -p 4000
```

[docsify]: https://docsify.js.org

## Features

List of features embedded with this SK

| Features                                      | DevOps                        | CI/CD                             |
| --------------------------------------------- | ----------------------------- | --------------------------------- |
| REST API                                      | Helm Chart                    | Automated semantic releasing      |
| TypeScript on FE & BE                         | Docker build                  | Sentry releasing                  |
| Object Storage support                        |                               |                                   |
| I18n module (with i18next)                    |                               |                                   |
| Client-Side-Field-Lebel-Encryption (CSFLE)    |                               |                                   |
| Fully configurable over environment variables | Guidelines for k8s setup      | Typescript checks                 |
| Sentry implementation & tracking              | CDN support for static assets | ESlint/Prettier checks            |
| Asynchronous worker & scheduler (bull)        |                               | Commit messages checks            |
| Hot reload on the whole stack                 |                               | Build check (reporting on bundle) |
| Cache server (redis)                          |                               | Docker build & push               |
| Rate limiter                                  |                               | Automated deployment with helm    |
| Security headers for HTTP requests            |                               |                                   |
| Database (mongodb) with migration framework   |                               |                                   |
| Emails rendering (react with mjml)            |                               |                                   |
| PDF rendering (react with remote printer)     |                               |                                   |
| DataLoader for GraphQL resolvers              |                               |                                   |
| Object Storage support                        |                               |                                   |
| I18n module (with i18next)                    |                               |                                   |
| Client-Side-Field-Lebel-Encryption (CSFLE)    |                               |                                   |

Security practices have been applied on this project based on experiences and feedbacks.
However, this is only a starter-kit as an helper to boostrap your project.
We do not hold responsibilities nor guarantee the security of your application.
