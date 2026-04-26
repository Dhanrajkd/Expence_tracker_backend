import {addtransaction,get_trans_data,deletedata,editdata} from "../Controllers/Transactioncontroller.js"
import express from "express"
import {transactionvalidator} from '../Middleware/Transactionmiddleware.js'
import {tokenvalidator} from "../Middleware/Tokenvalidator.js"
const router =express.Router()

router.post("/addtransaction",tokenvalidator,transactionvalidator,addtransaction)
router.get("/get_transaction",tokenvalidator,get_trans_data)
router.delete('/deletedata/:id',deletedata)
router.patch("/editdata/:id",editdata)

export default router
