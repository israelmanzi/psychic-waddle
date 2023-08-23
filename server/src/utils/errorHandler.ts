import { Request, Response } from "express";

export default (callback: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response) => {
    try {
      await callback(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Ooops! Something went wrong!",
      });
    }
  };
