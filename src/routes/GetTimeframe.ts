import express from "express";
import {DatabaseService} from "../database/service";
import {subDays} from "date-fns";

const router = express.Router();
const connection = DatabaseService.getInstance();

router.get("/timeframe", async (req, res) => {
    try {
            let today = new Date(Date.now());
            let toDate = subDays(today, (today.getDate()));
            let fromDate = subDays(toDate, toDate.getDate() - 1);


        const query = `
            SELECT TO_CHAR(o."purchaseDate", 'YYYY-MM-DD') AS purchaseDate 
                   , oi.price
            FROM white_away_schema.order o
            INNER JOIN white_away_schema.order_item oi ON oi."orderId" = o.id
            WHERE o."purchaseDate" BETWEEN $1 AND $2
                
        `;

        const result = await connection.query(query, [fromDate, toDate]);

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).send({msg: "Nothing found!"});
        }
    } catch (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

export {
    router as getTimeframe
}