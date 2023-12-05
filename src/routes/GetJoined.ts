import express from "express";
import { DatabaseService } from "../data/service";
import { Order } from "../entity/Order";
import { Customer } from "../entity/Customer"; 
import { OrderItem } from "../entity/OrderItem"; 

const router = express.Router();
const dataSource = DatabaseService.getInstance();

router.get("/joined", async (req, res) => {
    try {
        const result = await dataSource
            .getRepository(Order)
            .createQueryBuilder('o')
            .select([
                "o.id AS order_id",
                "o.device",
                "TO_CHAR(o.purchaseDate, 'YYYY-MM-DD') AS purchaseDate",
                "c.id AS customer_id",
                "c.firstName",
                "c.lastName",
                "oi.id AS order_item_id",
                "oi.quantity",
                "oi.price",
            ])
            .innerJoin(Customer, "c", "o.customerId = c.id")
            .innerJoin(OrderItem, "oi", "o.id = oi.orderId")
            .getRawMany();

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).send({ msg: "No sales data found!" });
        }
    } catch (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({ error: "Error Getting Joined Tables" });
    }
});

export { router as getJoinedTable };