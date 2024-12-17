import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import TransactionsController from "@modules/transactions/controllers/transactions.controller"

const transactionRouter = Router();
const transactionsController = new TransactionsController();
const upload = multer(uploadConfig.multer);

transactionRouter.post(
  "/upload",
  upload.single("file"),
  async (req, res, next) => {
    try {
      await transactionsController.upload(req, res);
    } catch (err) {
      next(err);
    }
  }
);

transactionRouter.get(
  "/",
  async (req, res, next) => {
    try {
      await transactionsController.list(req, res);
    } catch (err) {
      next(err);
    }
  }
);

export default transactionRouter;