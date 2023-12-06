import express from 'express';
import {
  getOrdersController,
  getRevenueController,
  getCustomersController,
} from '../controllers/Get_Sales_Controller'; // Adjust the import path as needed

const router = express.Router();

router.get('/total/orders', getOrdersController);
router.get('/total/revenue', getRevenueController);
router.get('/total/customers', getCustomersController);

export { router as getStatisticsRouter };