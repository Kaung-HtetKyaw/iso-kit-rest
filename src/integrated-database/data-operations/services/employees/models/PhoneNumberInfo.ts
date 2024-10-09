import { DataTypes, Model } from 'sequelize';
import { DatabaseContext } from '../../../../../database/instance';
import { PhoneNumberInfoAttributes, PhoneNumberInfoInput } from '../documents';

export class PhoneNumberInfo
    extends Model<PhoneNumberInfoAttributes, PhoneNumberInfoInput>
    implements PhoneNumberInfoAttributes
{
    public id!: number;
    public person_id: string;
    public display_phone_number: string;
    public phone_number_id: string;
}

export type PhoneNumberInfoType = typeof PhoneNumberInfo;

export const init = (sequelize: DatabaseContext['integrated']['client']) => {
    return PhoneNumberInfo.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            person_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            display_phone_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone_number_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'phone_number_info',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
};
