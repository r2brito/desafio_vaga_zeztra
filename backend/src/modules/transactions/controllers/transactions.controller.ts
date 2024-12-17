import { Request, Response } from "express";
import { TransactionService } from "../services/transactions.service";

export default class TransactionsController {
  public async upload(req: Request, res: Response): Promise<any> {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado." });
      }

      const result = await TransactionService.readFile(file);

      return res.status(200).json({ message: "Arquivo processado!", time: result.timeInSeconds });

    } catch (err) {
      return res.status(500).json({ message: "Erro ao processar o arquivo." });
    }
  }

  public async list(req: Request, res: Response): Promise<any> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const nome = req.query.nome as string;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      const result = await TransactionService.getTransactions(page, limit, nome, startDate, endDate);

      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao processar a requisição" })
    }
  }

}