import { DataSource } from 'typeorm';
import {Order} from "../entity/Order";
import {OrderItem} from "../entity/OrderItem";
import {Customer} from "../entity/Customer";

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
