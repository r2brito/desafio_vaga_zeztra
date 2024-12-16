import { Document, Types } from 'mongoose';

export abstract class BaseSchema extends Document<Types.ObjectId> {
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt!: Date;
  readonly deleted!: boolean;
}
