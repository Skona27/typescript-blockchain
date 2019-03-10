import { Router, Request, Response } from "express";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({text: 'Hello World!'});
});

export const IndexRouter: Router = router;