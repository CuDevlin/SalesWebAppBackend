import express from 'express';
import { getStatisticsController, getTotalRevenueController } from '../controllers/Get_Statistics_Controller';

const router = express.Router();

router.get('/statistics/:fromDate', getStatisticsController);
router.get('/total/revenue/:fromDate', getTotalRevenueController);

export { router as getStatistics };
