export const VALID_SIMPLE_DATA_FILTER = { isDeleted: false };

export type SortOrder = 1 | -1;
export type Sort<Document = Record<string, any>> = Record<keyof Document, SortOrder>;

export type Pagination<Document = Record<string, any>> = { page?: number; limit?: number; sort?: Sort<Document> };

export const VALID_SIMPLE_PAGINATION: Pagination = { page: 1, limit: 10, sort: { _id: 1 } };

export type PageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type CountableConnection<Document = Record<string, any>> = {
    pageInfo: PageInfo;
    edges: Document[];
    totalCount: number;
};
