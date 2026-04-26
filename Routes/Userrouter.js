import {adduser,checkuser} from "../Controllers/usercontroller.js"
import express from "express"
import {validator} from "../Middleware/validatormiddleware.js"
const router=express.Router()

router.post("/adduser",validator,adduser)
router.post("/checkuser",checkuser)

export default router