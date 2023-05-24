const express = require("express")
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
const User = require("../schemas/userSchema.js")
const bcrypt = require("bcrypt")



app.use(bodyParser.urlencoded({extented: false}));

router.get("/",(req,res,next)=>{
    if(req.session){
        req.session.destroy(()=>{
            res.status(200).redirect("/login")
        })
    }
})




module.exports = router