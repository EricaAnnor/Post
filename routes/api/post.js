const express = require("express")
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
const User = require("../../schemas/userSchema.js")
const Post = require("../../schemas/postSchema.js")



app.use(bodyParser.urlencoded({extented: false}));

router.get("/",(req,res,next)=>{
    Post.find()
    .populate("postedBy")
    .then((results)=>{
        res.status(200).send(results)
    })
    .catch((error)=>{
        console.log(error)
        res.sendStatus(400)
    })
})


router.post("/", async (req,res,next)=>{

    if(!req.body.content){
        console.log("contentparam not sent with a request")
        return res.sendStatus(400)
        
    }
    let data = {
        content: req.body.content,
        postedBy: req.session.user

    }

    Post.create(data)
    .then(async (postedData)=>{
        postedData = await User.populate(postedData, {path: "postedBy"})
        res.status(201).send(postedData)
    })
    .catch((error)=>{
        console.log(error)
        res.sendStatus(400)
    })

})

module.exports = router