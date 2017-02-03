// import fs from 'fs';
import express from 'express';
import * as messageCtlr from '../controllers/messages';
import * as universalCtlr from '../controllers/universal';

const router = express.Router();

router.get('/api/messages', messageCtlr.getMessages);
router.get('/index.html', universalCtlr.renderFullPage);
router.get('/*', universalCtlr.renderFullPage);

export default router;
