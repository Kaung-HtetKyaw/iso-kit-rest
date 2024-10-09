export type Paging = {
    offset?: number;
    limit?: number;
};

export interface DocumentList<TDocument> {
    items: TDocument[];
    count: number | null;
}

export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

export enum SortOrder {
    ASC = 1,
    DESC = -1,
}

export type Sorting = {
    type: string;
    order: SortOrder;
};

export enum Unit {
    Percentage = 'percentage',
    Currency = 'currency',
    Km = 'km',
}

export type IntlValue<TValue = string> = { [languageCode: string]: TValue };
