# Database

For the database, Type ORM called [Sequelize][sequelize] is used and mysql is chosen for the database dialect.

The database is organized in the `src/database` directory.

-   TypeScript types for the models are grouped in the `documents` directory
-   Data migration are grouped in the `migrations` directory
-   Documents are listed in `documents.ts`
-   Models are listed in `models.ts`

[sequelize]: https://sequelize.org/

The database context may be retrieved by calling `getDatabaseContext` such as :

```typescript
import { getDatabaseContext } from './database';

const getHeadlineTitles = async () => {
    const { operations } = await getDatabaseContext();

    // operations is exposed methods to interact with database indirectly
    // allowing us to do something such as
    return operations.findEmployee({});
};
```

## Example - New Models

First you must define the TypeScript type in the `documents` directory.

Here we create a document for headline in `Headline.ts`

```typescript
export type ArticleAttributes = {
    id: number;
    title: string;
    body: string;
};

export interface ArticleInput extends Optional<ArticleAttributes, 'id'> {}
export interface ArticleOutput extends Required<ArticleAttributes> {}
```

Then export it from `src/database/articles/documents/index.ts`

```typescript
// add the following line
export * from './Article';
```

Then you need to create model in `src/database/articles/models/Article.ts`

```typescript
import { DataTypes, Model, Sequelize } from 'sequelize';
import { ArticleAttributes, ArticleInput } from '../documents/Article';
import { DatabaseContext } from '../../../../database/instance';

export class Article extends Model<ArticleAttributes, ArticleInput> implements ArticleAttributes {
    public id!: number;
    public title: string;
    public body: string;
}

export type ArticleType = typeof Article;

export const init = (sequelize: DatabaseContext['regular']['client']) => {
    return Article.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.String,
            },
            body: {
                type: DataTypes.String,
            },
        },
        {
            sequelize,
            tableName: 'articles',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
};
```

Then export it from `src/database/articles/models/index.ts`

```typescript
// add the following line
export * as ArticleModel from './Article';
```

Then you can add your mutations and/or queries under `src/database/articles/mutations/**` and export it at `src/database/articles/mutations/index.ts`
