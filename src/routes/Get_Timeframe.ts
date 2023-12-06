import express from 'express';
import { getTimeframeController } from '../controllers/Get_Timeframe_Controller';

const router = express.Router();

router.get('/timeframe', getTimeframeController);

export { router as getTimeframe };