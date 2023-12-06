import express from "express";
import { OrderItem } from "../entity/OrderItem";
import { Order } from "../entity/Order";
import { Customer } from "../entity/Customer";
import { DatabaseService } from "../data/service";

const router = express.Router();
const dataSource = DatabaseService.getInstance();


router.get("/total/orders", async (req, res) => {
    try {
        const orders = await dataSource
            .getRepository(Order)
            .createQueryBuilder()
            .getCount();

        if (orders != 0) res.json(orders)
        else res.status(404).json([]);
    } catch
    (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({ error: "Error Getting Total Orders" });
    }
})
export {
    router as getOrdersRouter
}


router.get("/total/revenue", async (req, res) => {
    try {
        const revenue = await dataSource
            .getRepository(OrderItem)
            .createQueryBuilder()
            .select("SUM(price)", "total")
            .getRawOne();

        if (revenue.total != 0) res.json(parseInt(revenue.total));
        else res.status(404).json([]);
    } catch
    (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({ error: "Error Getting Total Revenue" });
    }
})
export {
    router as getRevenueRouter
}


router.get("/total/customers", async (req, res) => {
    try {
        const customers = await dataSource
            .getRepository(Customer)
            .createQueryBuilder()
            .getCount();

        if (customers != 0) res.json(customers)
        else res.status(404).json([]);
    } catch
    (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({ error: "Error Getting Total Customers" });
    }
})
export {
    router as getCustomersRouter
}