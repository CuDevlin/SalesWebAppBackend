import express from "express";
import {OrderItem} from "../entities/OrderItem";
import {Order} from "../entities/Order";
import {Customer} from "../entities/Customer";
import {DatabaseService} from "../database/service";

const router = express.Router();
const connection = DatabaseService.getInstance()


router.get("/total/orders", async (req, res) => {
    try {
        const orders = await connection
            .createQueryBuilder()
            .select("id")
            .from(Order, "orders")
            .getCount();

        if (orders != 0) res.json(orders)
        else res.status(404).send({msg: "No orders!"})
    } catch
        (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
})
export {
    router as getOrdersRouter
}


router.get("/total/revenue", async (req, res) => {
    try {
        const revenue = await connection
            .createQueryBuilder()
            .select("SUM(price)", "total")
            .from(OrderItem, "orders_item")
            .getRawOne();

        if (revenue.total != 0) res.json(parseInt(revenue.total));
        else res.status(404).send({msg: "No revenue!"})
    } catch
        (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
})
export {
    router as getRevenueRouter
}


router.get("/total/customers", async (req, res) => {
    try {
        const customers = await connection
            .createQueryBuilder()
            .select("*")
            .from(Customer, "customer")
            .getCount();

        if (customers != 0) res.json(customers)
        else res.status(404).send({msg: "No customers!"})
    } catch
        (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
})
export {
    router as getCustomersRouter
}