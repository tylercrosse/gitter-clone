import express from 'express';
import * as messageCtlr from '../controllers/messages';
import * as convoCtlr from '../controllers/convos';
import * as universalCtlr from '../controllers/universal';

const router = express.Router();

router.get('/api/messages/:convo', messageCtlr.getMessages);
router.get('/api/convos', convoCtlr.getConvos);
router.get('/index.html', universalCtlr.renderFullPage);
router.get('/*', universalCtlr.renderFullPage);

export default router;
