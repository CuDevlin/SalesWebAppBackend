import { DatabaseService } from './data/service';
import express, { json } from 'express';
import cors from 'cors';

import {
    getCustomersRouter,
    getOrdersRouter,
    getRevenueRouter,
} from './routes/GetSales';

import { getJoinedTable } from './routes/GetJoined';
import { getTimeframe } from './routes/GetTimeframe';
import { getStatistics } from './routes/GetStatistics';

const appExpress = express();
const connection = DatabaseService.getInstance();

const main = async () => {
    await connection
        .initialize()
        .then(() => {
            console.log('Data Source has been initialized!');

            // Enable CORS for all routes
            appExpress.use(cors());

            appExpress.use(json());
            appExpress.use(getOrdersRouter);
            appExpress.use(getRevenueRouter);
            appExpress.use(getCustomersRouter);
            appExpress.use(getJoinedTable);
            appExpress.use(getStatistics);
            appExpress.use(getTimeframe);

            appExpress.listen(8080, () => {
                console.log('Express app running on port:8080');
            });
        })
        .catch((err) => {
            console.error('Error during Data Source initialization', err);
        });
};

main().then(() => {});
