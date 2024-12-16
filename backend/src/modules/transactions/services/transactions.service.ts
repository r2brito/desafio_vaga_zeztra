import * as fs from "fs";
import * as readline from 'readline';
import ValidatorUtil from "core/utils/documentValidator.util";
import ParseUtil from "core/utils/parse.util";

export class TransactionService {
  static async readFile(file: Express.Multer.File) {

    const stream = fs.createReadStream(file.path);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (!line.trim()) continue;

      const parsedLine = ParseUtil.parseLine(line)

      const { nome, cpfCnpj } = parsedLine

      if (!cpfCnpj || !ValidatorUtil.document(cpfCnpj)) {
        continue;
      }


    }

    return { message: 'Arquivo carregado com sucesso' };
  }
}

export default TransactionService;