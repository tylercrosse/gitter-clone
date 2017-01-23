import express from 'express';
import * as apiCtlr from '../controllers/api';

const router = express.Router();

router.get('/api/messages', apiCtlr.getMessages);

export default router;
