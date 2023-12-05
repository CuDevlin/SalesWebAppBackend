import express from "express";
import {OrderItem} from "../entity/OrderItem";
import {Order} from "../entity/Order";
import {Customer} from "../entity/Customer";
import {DatabaseService} from "../data/service";
import {getRepository} from "typeorm";

const router = express.Router();
const connection = DatabaseService.getInstance()


router.get("/total/orders", async (req, res) => {
    try {
        const orderRepository = getRepository(Order);
        const ordersCount = await orderRepository.count();
        
        if (ordersCount != 0) res.json(ordersCount)
        else res.status(404).send({msg: "No order data available!"})
    } catch
        (error) {
        console.error("Error retrieving total order data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
})
export {
    router as getOrdersRouter
}


router.get("/total/revenue", async (req, res) => {
    try {
        const orderItemRepository = getRepository(OrderItem);
        const revenueResult = await orderItemRepository
            .createQueryBuilder()
            .select("SUM(price)", "total")
            .getRawOne();

        const totalRevenue = revenueResult.total || 0;

        if (totalRevenue != 0) res.json(parseInt(totalRevenue));
        else res.status(404).send({msg: "No Revenue Data Available!"})
    } catch
        (error) {
        console.error("Error retrieving total revenue data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
})
export {
    router as getRevenueRouter
}


router.get("/total/customers", async (req, res) => {
    try {
        const customerRepository = getRepository(Customer);
        const customersCount = await customerRepository.count();


        if (customersCount != 0) res.json(customersCount)
        else res.status(404).send({msg: "No Customer Data Available!"})
    } catch
        (error) {
        console.error("Error retrieving total customer data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
})
export {
    router as getCustomersRouter
}