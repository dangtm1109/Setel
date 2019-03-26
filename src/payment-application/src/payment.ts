import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
class App {
  public express;
  constructor() {
    this.express = express();
    this.mountRoutes();
  }
  private mountRoutes() {
    const router = express.Router();
    router.use(bodyParser.json());
    router.post('/payment', (req: Request, res: Response) => {
      res.json({ message: Math.floor(Math.random() * 2) });
    });
    this.express.use('/api', router);
  }
}

const app = new App();
export default app.express;
