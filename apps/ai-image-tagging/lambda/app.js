'use strict';

const path = require('path');

const express = require('express');

const tag = require('./tag');
const app = express();


const APP_ROOT = require('app-root-path').toString();
const FRONTEND = path.resolve(APP_ROOT, './node_modules/ai-image-tagging-frontend/build');

app.use('/tags', async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed.' });
    return;
  }

  try {
    res.json({ tags: await tag(req.path) })
  } catch (err) {
    res.status(400).json({ message: err.message || err.errorMessage });
  }
});

app.use('/frontend', express.static(FRONTEND));
app.use((_req, res) => res.status(404).send('Not found'));

module.exports = app;
