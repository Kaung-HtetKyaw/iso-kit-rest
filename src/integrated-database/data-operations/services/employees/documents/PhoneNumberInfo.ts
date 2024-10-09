import { Optional } from 'sequelize';
import { z } from 'zod';

export const PhoneNumberInfoPersonTypes = { employee: 'employee', contact: 'contact' } as const;
export type PhoneNumberInfoPersonTypesEnum = keyof typeof PhoneNumberInfoPersonTypes;

export const PhoneNumberInfoSchema = z.object({
    id: z.number().optional(),
    display_phone_number: z.string({
        required_error: 'display_phone_number is required',
    }),
    phone_number_id: z.string({
        required_error: 'phone_number_id is required',
    }),
    person_id: z.string({
        required_error: 'person_id is required',
    }),
    type: z.nativeEnum(PhoneNumberInfoPersonTypes),
});

export type PhoneNumberInfoAttributes = z.infer<typeof PhoneNumberInfoSchema>;
export interface PhoneNumberInfoInput extends Optional<PhoneNumberInfoAttributes, 'id'> {}
export interface PhoneNumberInfoOutput extends Required<PhoneNumberInfoAttributes> {}
