import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import svgr from '@svgr/rollup';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const https = {
  key: fs.readFileSync(path.resolve(dirName, 'cert/localhost-key.pem')),
  cert: fs.readFileSync(path.resolve(dirName, 'cert/localhost.pem')),
};

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    https,
    host: true,
  },
});
