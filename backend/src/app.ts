import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { errors } from "celebrate";

import routes from "./routes";
import AppError from "@errors/AppError";

import './database';

const app = express();

const isDevelopment = process.env.NODE_ENV === "development";

const logFormat = isDevelopment ? "dev" : "combined";

if (!isDevelopment) {
  const logDirectory = path.join(__dirname, '..', 'logs');

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory)
  }

  const accessLogStream = fs.createWriteStream(path.join(logDirectory, "access.log"), { flags: "a" });

  app.use(morgan(logFormat, { stream: accessLogStream }))
} else {
  app.use(morgan(logFormat));
}

const corsOptions = {
  origin: process.env.APP_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errors());

app.use((
  (err: Error, request: Request, response: Response, _next: NextFunction): void => {
    request.setTimeout(5000);
    if (err instanceof AppError) {
      response.status(err.statusCode).json({
        status: "error",
        message: err.message
      });
      return
    }

    console.error("Unhandled Error:", {
      message: err.message,
      stack: err.stack,
    });

    response.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later."
    });
  }
) as express.ErrorRequestHandler);

export { app };