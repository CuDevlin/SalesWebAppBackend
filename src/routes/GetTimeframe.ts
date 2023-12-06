import express from "express";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { subDays } from "date-fns";
import { DatabaseService } from "../data/service";

const router = express.Router();
const dataSource = DatabaseService.getInstance();

router.get("/timeframe", async (req, res) => {
    try {
        const today = new Date(Date.now());
        const toDate = subDays(today, today.getDate());
        const fromDate = subDays(toDate, toDate.getDate() - 1);

        const result = await dataSource
            .getRepository(OrderItem)
            .createQueryBuilder("oi")
            .select("TO_CHAR(o.purchaseDate, 'YYYY-MM-DD')", "purchaseDate")
            .addSelect("oi.price")
            .innerJoin(Order, "o", "oi.orderId = o.id")
            .where("o.purchaseDate BETWEEN :fromDate AND :toDate", { fromDate, toDate })
            .getRawMany();

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        console.error("Error retrieving data within the timeframe:", error);
        res.status(500).json({ error: "Error Getting TimeFrame!" });
    }
});

export { router as getTimeframe };