import { DataSource } from 'typeorm';
import {Order} from "../entities/Order";
import {OrderItem} from "../entities/OrderItem";
import {Customer} from "../entities/Customer";

export class DatabaseService {
    private static instance: DataSource;

    private constructor() {}

    public static getInstance(): DataSource {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DataSource({
                schema: "white_away_schema",
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "postgres",
                database: "postgres",
                entities: [Order, OrderItem, Customer],
                synchronize: true
            });
        }

        return DatabaseService.instance;
    }
}
