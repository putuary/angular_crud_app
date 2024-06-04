import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { Student } from './src/app/interfaces/student';
import { v4 as uuidv4 } from 'uuid';


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  let data : Student[] =[
    {
      id: uuidv4(),
      name: "Putu Ary Kusuma Yudha",
      nim: "119140098",
      prodi: "Teknik Informatika"
    },
    {
      id: uuidv4(),
      name: "Dinda Mutiara Hati",
      nim: "121260144",
      prodi: "Farmasi"
    }
];
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.use(express.json());
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  server.get('/api/student', (req, res) => {
    res.send(data);
  })

  server.get('/api/student/:id', (req, res) => {
    const id = req.params.id;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        res.send(data[i]);
        break;
      }
    }
  })

  server.post('/api/student', (req, res) => {
    console.log('body', req.body);
    data.push(req.body);
    res.send(req.body);
  })

  server.put('/api/student', (req, res) => {
    const id = req.body.id;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i] = req.body;
        break;
      }
    }
    res.send(req.body);
  })

  server.delete('/api/student/:id', (req, res) => {
    const id = req.params.id;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data.splice(i, 1);
        break;
      }
    }
  })

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
