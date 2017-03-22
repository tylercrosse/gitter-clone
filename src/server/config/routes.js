import express from 'express';
import * as messageCtlr   from '../controllers/messages';
import * as convoCtlr     from '../controllers/convos';
import * as assetCtlr    from '../controllers/assets';
import * as universalCtlr from '../controllers/universal';

const router = express.Router();

router.get('/api/messages/:convo', messageCtlr.getMessages);
router.get('/api/convos', convoCtlr.getConvos);
router.get('/25716D9DF9801A2B91D3874529F091F2.txt', assetCtlr.getDCV);
router.get('/index.html', universalCtlr.renderFullPage);
router.get('/*', universalCtlr.renderFullPage);

export default router;
