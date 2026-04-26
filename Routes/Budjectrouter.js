import {Addbudject,getbudject} from "../Controllers/Budjectcontroller.js"
import {tokenvalidator} from '../Middleware/Tokenvalidator.js'
import express from 'express'

const router=express.Router()

router.put("/Addbudject",tokenvalidator,Addbudject)
router.get("/getbudject",tokenvalidator,getbudject)
export default router