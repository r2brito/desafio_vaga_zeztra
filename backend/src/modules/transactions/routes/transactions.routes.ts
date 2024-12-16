import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import TransactionsController from "@modules/transactions/controllers/transactions.controller"

const transactionRouter = Router();
const transactionsController = new TransactionsController();
const upload = multer(uploadConfig.multer);

transactionRouter.post(
  "/",
  upload.single("file")
  transactionsController.upload
);

export default transactionRouter;