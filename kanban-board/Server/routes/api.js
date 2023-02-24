const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

const mongoose = require('mongoose')
const db = "mongodb+srv://harsh:Harsh123456@kanbanboard.vg71trr.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db,err => {
    if(err){
        console.error('Error!' + err)       
    }else{
        console.log('Connetced to mongodb')
    } 
})
router.get('/',(req,res)=>{
    res.send('From API route')
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

router.post('/register',(req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser) => {
        if(error){
            console.log(error)
        }
        else{
            let payload={subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req,res) => {
    let userData = req.body
    console.log(userData)
    User.findOne({UserName : userData.UserName}, (error,user) => {
        if(error){
            console.log(error)
        }
        else{
            if(!user){
                res.status(401).send('Invalid Username')
            }else
            {
                if(user.Password !== userData.Password)
                {
                    res.status(401).send('Invalid Password')
                }else{
                  let payload = {subject: user._id}
                  let token = jwt.sign(payload, 'secretKey')
                  res.status(200).send({token})
                }
            }
        }
    })
})

// router.get('/kananBoard', verifyToken, (req, res) => {
//     let specialEvents = [
//       {
//         "_id": "1",
//         "name": "Auto Expo Special",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       },
//       {
//         "_id": "2",
//         "name": "Auto Expo Special",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       },
//       {
//         "_id": "3",
//         "name": "Auto Expo Special",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       },
//       {
//         "_id": "4",
//         "name": "Auto Expo Special",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       },
//       {
//         "_id": "5",
//         "name": "Auto Expo Special",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       },
//       {
//         "_id": "6",
//         "name": "Auto Expo Special",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       }
//     ]
//     res.json(specialEvents)
//   })

module.exports=router