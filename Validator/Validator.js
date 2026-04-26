import {body} from "express-validator"

export const validate=[
    body("email")
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("enter valid email"),
    body("password")
    .notEmpty().withMessage("password is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/).withMessage("Please enter a valid email")
]
