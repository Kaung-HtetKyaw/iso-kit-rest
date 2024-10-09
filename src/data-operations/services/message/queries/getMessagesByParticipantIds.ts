import { FindCursor, ObjectId, RootFilterOperators } from 'mongodb';
import { MessageCollections, MessageDocument } from '../documents';
import { CountableConnection, Pagination, VALID_SIMPLE_PAGINATION } from '../../../utils/filter';

export type GetMessagesByParticipantIds = (
    ids: string[],
    pagination?: Pagination<MessageDocument>
) => Promise<CountableConnection<MessageDocument>>;

const getMessagesByParticipantIds =
    (collections: MessageCollections): GetMessagesByParticipantIds =>
    async (ids, pagination = VALID_SIMPLE_PAGINATION) => {
        const [
            {
                totalCount: [totalCount = 0],
                edges,
            },
        ] = await collections.messages
            .aggregate([
                { $match: { $and: [{ from: { $in: ids } }, { to: { $in: ids } }] } },
                {
                    $facet: {
                        total: [{ $group: { _id: null, count: { $sum: 1 } } }],
                        edges: [
                            { $sort: pagination.sort },
                            { $skip: pagination.limit * (pagination.page - 1) },
                            { $limit: pagination.limit },
                        ],
                    },
                },
                {
                    $project: {
                        totalCount: '$total.count',
                        edges: '$edges',
                    },
                },
            ])
            .toArray();

        return { totalCount, edges, pageInfo: { hasNextPage: true, hasPreviousPage: true } };
    };

export default getMessagesByParticipantIds;
