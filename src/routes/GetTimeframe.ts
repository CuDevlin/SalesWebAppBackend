import express from "express";
import { getRepository, Between } from "typeorm";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { subDays } from "date-fns";

const router = express.Router();

router.get("/timeframe", async (req, res) => {
    try {
        let today = new Date(Date.now());
        let toDate = subDays(today, today.getDate());
        let fromDate = subDays(toDate, toDate.getDate() - 1);

        const result = await getRepository(OrderItem)
            .createQueryBuilder("oi")
            .select("TO_CHAR(o.purchaseDate, 'YYYY-MM-DD')", "purchaseDate")
            .addSelect("oi.price")
            .innerJoin(Order, "o", "oi.orderId = o.id")
            .where("o.purchaseDate BETWEEN :fromDate AND :toDate", { fromDate, toDate })
            .getRawMany();

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).send({ msg: "Nothing found!" });
        }
    } catch (error) {
        console.error("Error retrieving data within the timeframe:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export { router as getTimeframe };