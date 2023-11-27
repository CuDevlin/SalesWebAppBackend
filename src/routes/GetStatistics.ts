import express from "express";
import {DatabaseService} from "../database/service";
import {addMonths, subDays} from "date-fns";

const router = express.Router();
const connection = DatabaseService.getInstance();

router.get("/statistics/:fromDate", async (req, res) => {
    try {

        let {fromDate} = req.params;

        let fromDateObj = new Date((fromDate + "-01"));


        let toDateObj = new Date(addMonths(fromDateObj, 1))
        toDateObj = subDays(toDateObj, 1);

        const query = `
            SELECT TO_CHAR(o."purchaseDate", 'YYYY-MM-DD') AS purchaseDate
                 , oi.price
            FROM white_away_schema.order o
                     INNER JOIN white_away_schema.order_item oi ON oi."orderId" = o.id
            WHERE o."purchaseDate" BETWEEN $1 AND $2
            ORDER BY purchaseDate
        `;

        const result = await connection.query(query, [fromDateObj, toDateObj]);

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

export {router as getStatistics};
