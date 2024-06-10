import express from "express";
import db from "@repo/db/client";

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    db.balance.update({
        where: {
            userId: paymentInformation.userId
        },
        data: {
            amount: {
                increment: paymentInformation.amount
            }
        }
    });

    await db.onRampTransaction.update({
        where: {
            token: paymentInformation.token
        }, 
        data: {
            status: "Success"
        }
    })
    // Update balance in db, add txn
})


// balance
// onRampTransaction