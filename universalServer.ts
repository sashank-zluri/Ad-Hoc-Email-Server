// These are important and needed before anything else
import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppServerModule } from './client/app/app.server.module';

const properties = {
  serverBaseUri: process.env.serverBaseUri,
  mongoConnectUrl: process.env.mongoConnectUrl,
  dbName: process.env.dbName || 'ahem',
  appListenPort: parseInt(process.env.appListenPort) || 3000,
  smtpPort: parseInt(process.env.smtpPort) || 25,
  emailDeleteInterval: parseInt(process.env.emailDeleteInterval) || 3600,
  emailDeleteAge: parseInt(process.env.emailDeleteAge) || 86400,
  allowAutocomplete: JSON.parse(process.env.allowAutocomplete),
  allowedDomains: process.env.allowedDomains.split(','),
  jwtSecret: process.env.jwtSecret,
  jwtExpiresIn: parseInt(process.env.jwtExpiresIn) || 3600,
  maxAllowedApiCalls: parseInt(process.env.maxAllowedApiCalls) || 10000
};

console.log(properties);

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const browserDistFolder = join(DIST_FOLDER, 'browser');
const indexHtml = existsSync(join(browserDistFolder, 'index.original.html')) 
  ? join(browserDistFolder, 'index.original.html')
  : join(browserDistFolder, 'index.html');

const commonEngine = new CommonEngine();

// Server static files from /browser
app.get('*.*', express.static(browserDistFolder, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap: AppServerModule,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [
        { provide: APP_BASE_HREF, useValue: properties.serverBaseUri || baseUrl }
      ],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

