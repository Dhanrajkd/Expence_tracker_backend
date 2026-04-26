import {validationResult} from "express-validator"
export const transactionvalidator = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const firstError = errors.array()

        if (firstError.length > 0) {
            return res.status(400).json({
                success: false,
                message: firstError[0].msg
            })
        }

        return res.status(400).json({
            success: false,
            message: "Validation error"
        })
    }

    next()
}