import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const SimpleVersionSchema = z.object({
    createdAt: z.date(),
    createdBy: z.instanceof(ObjectId).nullable(),
    updatedAt: z.date(),
    updatedBy: z.instanceof(ObjectId).nullable(),
});

export type SimpleVersionDocument = z.infer<typeof SimpleVersionSchema>;

export const VersionSchema = z.object({
    id: z.instanceof(ObjectId).optional(),
    isOutdated: z.boolean(),
    createdAt: z.date(),
    createdBy: z.instanceof(ObjectId).nullable(),
    updatedAt: z.date(),
    updatedBy: z.instanceof(ObjectId).nullable(),
});
export type VersionDocument = z.infer<typeof VersionSchema>;

export interface Documents<TItem> {
    items: TItem[];
    count?: number;
}

export const PeriodSchema = z.object({
    start: z.date().optional(),
    startTimeZone: z.string().optional(),
    end: z.date().optional(),
    endTimeZone: z.string().optional(),
});

export type Period = z.infer<typeof PeriodSchema>;
