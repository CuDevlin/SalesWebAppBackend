import express from "express";
import {DatabaseService} from "../database/service";

const router = express.Router();
const connection = DatabaseService.getInstance();

router.get("/joined", async (req, res) => {
    try {
        const query = `
            SELECT o.id AS order_id,
                   o.device,
                   TO_CHAR(o."purchaseDate", 'YYYY-MM-DD') AS purchaseDate,
                   c.id AS customer_id,
                   c."firstName",
                   c."lastName",
                   oi.id AS order_item_id,
                   oi.quantity,
                   oi.price
            FROM white_away_schema.order o
                     INNER JOIN white_away_schema.customer c ON o."customerId" = c.id
                     INNER JOIN white_away_schema.order_item oi ON o.id = oi."orderId";
        `;

        const result = await connection.query(query);

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).send({ msg: "No sales found!" });
        }
    } catch (error) {
        console.error("Error retrieving joined data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export {
    router as getJoinedTable
}