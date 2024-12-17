import * as fs from "fs";
import * as readline from "readline";
import { performance } from 'perf_hooks';
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
  public static async readFile(file: Express.Multer.File): Promise<{ timeInSeconds: string }> {
    const startTime = performance.now();
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
          const endTime = performance.now();

          const timeInSeconds = ((endTime - startTime) / 1000).toFixed(2);

          console.log(
            `Tempo de processamento do arquivo: ${timeInSeconds} segundos`
          );

          resolve({ timeInSeconds });
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

  public static async getTransactions(page: number = 1,
    limit: number = 10,
    nome?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<any> {

    try {
      const query: any = {};

      if (nome) {
        const clients = await Client.find({
          nome: new RegExp(nome, "i"),
        });

        if (clients.length === 0) {
          return {
            page,
            limit,
            totalPages: 0,
            totalTransactions: 0,
            transactions: [],
            transactionsOnPage: 0,
          };
        }

        const clientIds = clients.map((client) => client._id);
        query.clientId = { $in: clientIds };
      }

      if (startDate || endDate) {
        query.data = {};
        if (startDate) query.data.$gte = startDate;
        if (endDate) query.data.$lte = endDate;
      }

      const order = query.sortOrder === "desc" ? -1 : 1;

      const transactions = await Transactions.find(query).sort({ [query.sortBy || "date"]: order }).populate(
        {
          path: 'clientId',
          strictPopulate: false
        }
      )
        .skip((page - 1) * limit)
        .limit(limit);

      const filteredTransactions = transactions.filter((transaction) => transaction.clientId);

      const totalTransactions = await Transactions.countDocuments(query);

      return {
        page,
        limit,
        totalPages: Math.ceil(totalTransactions / limit),
        total: totalTransactions,
        transactions: filteredTransactions,
        transactionsOnPage: filteredTransactions.length,
      };
    } catch (err) {
      console.error('Erro ao buscar transações:', err);
      throw new Error("Erro ao buscar transações no banco de dados");
    }
  }
}

export default TransactionService;
