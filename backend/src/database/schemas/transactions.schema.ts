import { Types, model, Schema } from 'mongoose';
import { BaseSchema } from '../../core/schemas/base.schema';

export class ITransaction extends BaseSchema {
  readonly clientId: Types.ObjectId;
  readonly transactionId: string;
  readonly data: Date;
  readonly valor: number;
}

const TransactionsSchema = new Schema<ITransaction>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'client' },
    transactionId: { type: String, required: true, unique: true },
    data: { type: Date, required: true },
    valor: { type: Number, required: true }
  },
  {
    timestamps: true,
    collection: 'transactions',
  }
)

export const Transactions = model<ITransaction>('transactions', TransactionsSchema)
