import express from "express";
import { DatabaseService } from "../data/service";
import { Order } from "../entity/Order"
import { OrderItem } from "../entity/OrderItem";

const router = express.Router();
const dataSource = DatabaseService.getInstance();

router.get("/statistics/:fromDate", async (req, res) => {
    try {
        const { fromDate } = req.params;

        const fromDateObj = new Date(`${fromDate}-01`);
        const toDateObj = new Date(fromDateObj);
        toDateObj.setMonth(toDateObj.getMonth() + 1);
        toDateObj.setDate(toDateObj.getDate() - 1);

        const result = await dataSource
            .getRepository(OrderItem)
            .createQueryBuilder("oi")
            .select("TO_CHAR(o.purchaseDate, 'YYYY-MM-DD')", "purchaseDate")
            .addSelect("oi.price")
            .innerJoin(Order, "o", "oi.orderId = o.id")
            .where("o.purchaseDate BETWEEN :fromDate AND :toDate", { fromDate: fromDateObj, toDate: toDateObj })
            .orderBy("purchaseDate")
            .getRawMany();

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({ error: "Error Getting Statistics From Date" });
    }
});

export { router as getStatistics };
