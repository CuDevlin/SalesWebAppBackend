import { DatabaseService } from './data/service';
import express, { json } from 'express';
import cors from 'cors';

import {
    getStatisticsRouter
} from './routes/Get_Sales';

import { getJoinedTable } from './routes/Get_Joined';
import { getTimeframe } from './routes/Get_Timeframe';
import { getStatistics } from './routes/Get_Statistics';

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
            appExpress.use(getStatisticsRouter);
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
