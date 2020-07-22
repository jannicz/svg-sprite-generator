import express, { Request, Response } from 'express';
import next from 'next';
import nextI18next from '../i18n';
import nextI18NextMiddleware from 'next-i18next/middleware';

// Local files
import attributesJson from '../assets/attributes.json';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

export class Server {
  constructor() {
    this.start();
  }

  start = async () => {
    try {
      await app.prepare();
      const server = express();

      await nextI18next.initPromise;
      server.use(nextI18NextMiddleware(nextI18next));

      /* Classic API approach */
      server.get('/api/expressSvg', (req, res) => {
        console.log('API /api/expressSvg, method =>', req.method, 'query =>', req.query);
        return res.status(200).json(attributesJson);
      });

      server.all('*', (req: Request, res: Response) => {
        return handle(req, res);
      });

      server.listen(port, (error?: any) => {
        if (error) {
          throw error;
        }
        console.log(`Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
