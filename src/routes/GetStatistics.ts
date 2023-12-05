import express from "express";
import { DatabaseService } from "../data/service";
import { addMonths, subDays } from "date-fns";

const router = express.Router();
const connection = DatabaseService.getInstance();

router.get("/statistics/:fromDate", async (req, res) => {
    try {
        const { fromDate } = req.params;

        const fromDateObj = new Date((fromDate + "-01"));
        const toDateObj = new Date(addMonths(fromDateObj, 1));
        const finalToDateObj = subDays(toDateObj, 1);

        const query = `
            SELECT TO_CHAR(o."purchaseDate", 'YYYY-MM-DD') AS purchaseDate
                 , oi.price
            FROM web_app_schema.order o
                     INNER JOIN web_app_schema.order_item oi ON oi."orderId" = o.id
            WHERE o."purchaseDate" BETWEEN $1 AND $2
            ORDER BY purchaseDate
        `;

        const result = await connection.query(query, [fromDateObj, finalToDateObj]);

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export { router as getStatistics };
