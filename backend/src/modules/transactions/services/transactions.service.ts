export class TransactionService {
  static async readFile(file: Express.Multer.File) {
    console.log("file:", file)

    return { message: 'Arquivo carregado com sucesso' };
  }
}

export default TransactionService;