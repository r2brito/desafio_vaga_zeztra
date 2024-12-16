import { model, Schema } from 'mongoose';
import { BaseSchema } from '../../core/schemas/base.schema';

export class IClient extends BaseSchema {
  readonly nome: string;
  readonly cpfCnpj: string;
}

const ClientSchema = new Schema<IClient>(
  {
    nome: { type: String, required: true },
    cpfCnpj: { type: String, required: true, unique: true }
  },
  {
    timestamps: true,
    collection: 'client',
  }
)

export const ClientModel = model<IClient>('Client', ClientSchema)
