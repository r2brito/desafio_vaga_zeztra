import { Types, model, Schema } from 'mongoose';
import { BaseSchema } from '../../core/schemas/base.schema';

export class ITransaction extends BaseSchema {
  readonly clientId: Types.ObjectId;
  readonly transactionId: string;
  readonly date: Date;
  readonly value: number;
}

const TransactionsSchema = new Schema<ITransaction>(
  {
    clientId: { type: Types.ObjectId, required: true, ref: 'client' },
    transactionId: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    value: { type: Number, required: true }
  },
  {
    timestamps: true,
    collection: 'Transaction',
  }
)

export const TransactionsModel = model<ITransaction>('Transaction', TransactionsSchema)
