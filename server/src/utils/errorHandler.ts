import { Request, Response } from "express";

export class NilReturnError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidInputError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default (callback: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response) => {
    try {
      await callback(req, res);
    } catch (error) {
      if (error instanceof NilReturnError) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof InvalidInputError) {
        res.status(400).json({ error: error.message });
      } else {
        console.log(error)
        res.status(500).json({
          message: "Ooops! Something went wrong on our side." + error,
        });
      }
    }
  };
