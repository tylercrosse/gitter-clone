// import fs from 'fs';
import express from 'express';
import * as messageCtlr from '../controllers/messages';
import * as staticCtlr from '../controllers/statics';

const router = express.Router();

router.get('/api/messages', messageCtlr.getMessages);
router.get('/index.html', staticCtlr.renderFullPage);
router.get('/*', staticCtlr.renderFullPage);

export default router;
