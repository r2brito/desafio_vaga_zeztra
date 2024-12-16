import { Request, Response } from "express";
import { TransactionService } from "../services/transactions.service";

export default class TransactionsController {
  public async upload(req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado." });
      }

      const result = await TransactionService.readFile(file);

      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao processar o arquivo." });
    }
  }

}