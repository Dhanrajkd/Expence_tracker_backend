import {body} from "express-validator"

export const Transactionvalidate=[
    body("amount")
    .notEmpty().withMessage("amount is required"),
    body("method")
    .notEmpty().withMessage("method is required"),
    body("paymentfor")
    .notEmpty().withMessage("payment is required")
]