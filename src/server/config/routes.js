import express from 'express';
import * as messageCtlr   from '../controllers/messages';
import * as convoCtlr     from '../controllers/convos';
import universalCtlr      from '../controllers/universal';

const router = express.Router();

router.get('/api/messages/:convo', messageCtlr.getMessages);
router.get('/api/convos', convoCtlr.getConvos);
router.get('/index.html', universalCtlr);
router.get('/*', universalCtlr);

export default router;
