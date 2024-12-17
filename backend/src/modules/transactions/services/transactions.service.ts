import * as fs from "fs";
import * as readline from "readline";
import { Client } from "@database/schemas/client.schema";
import { Transactions } from "@database/schemas/transactions.schema";
interface RecordData {
  cpfCnpj: string;
  nome: string;
  valor: number;
  data: Date;
  id: string;
}


export class TransactionService {
  public static async readFile(file: Express.Multer.File): Promise<void> {
    const { path } = file;
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(path, { encoding: 'utf8' });
      const rl = readline.createInterface({ input: stream });

      const records: RecordData[] = [];

      rl.on('line', (line) => {
        const trimmedLine = line.trim();
        if (trimmedLine) {
          const fields = trimmedLine.split(';').reduce((acc, field) => {
            const [key, value] = field.split(':');
            if (key && value) {
              acc[key.trim()] = value.trim();
            }
            return acc;
          }, {} as RecordData);

          if (fields.cpfCnpj) {
            records.push(fields);
          }
        }
      });

      rl.on('close', async () => {
        try {
          for (const record of records) {
            const { cpfCnpj, nome, valor, data, id } = record;

            let client = await Client.findOne({ cpfCnpj: cpfCnpj });

            if (!client) {
              client = await Client.create({
                nome,
                cpfCnpj
              });
            }

            let transaction = await Transactions.findOne({ transactionId: id });

            if (!transaction) {
              const transactionData = {
                clientId: client._id,
                valor,
                data: new Date(data),
                transactionId: id,
              };

              await Transactions.create(transactionData);
            }
          }
          resolve();
        } catch (error) {
          console.error('Erro ao salvar no banco de dados:', error);
          reject(error);
        }
      });

      rl.on('error', (err) => {
        console.error('Erro ao ler o arquivo:', err);
        reject(err);
      });
    });
  }
}

export default TransactionService;
