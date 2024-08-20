import { Schema } from 'mongoose';

export function checkFieldExists(schema: Schema, fieldName: string): boolean {
    return schema.paths[fieldName] !== undefined;
}

 