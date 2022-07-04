require('dotenv').config()
const bcrypt = require('bcrypt')
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken')


const User = require('../models/user')

const addUser = (req, res) => {

    User.findOne({ 'email': req.body.email })
        .then(async (result) => {
            if (result == null) {
                let cryptedPassword = await Encrypt.cryptPassword(req.body.password);
                let user = new User({
                    "email": req.body.email,
                    "password": cryptedPassword
                })

                user.save()
                    .then((result) => {
                        res.json({ msg: "Added Successfully", created: true })
                        sendMail(req.body.email)
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            }
            else {
                res.json({ msg: "Account Already Exist", created: false })

            }
        })
}


const validateAccount = (req, res) => {
    const email = req.query.email;

    User.updateOne({ "email": email }, { "active": true })
        .then((result) => {
            res.json({ "result": "Activated" })
        })
        .catch((err) => {
            res.send(err)
        })
}


const login = (req, res) => {
    User.findOne({ "email": req.body.email })
        .then(async (result) => {
            if (result != null) {
                if(result.active)
                {
                    if (await Encrypt.comparePassword(req.body.password,result.password)) {
                        let token = jwt.sign({ "result": result.id }, process.env.TOKEN_KEY)
                        res.json({ 'token': token, state: 'Connected'  })
    
                    }
                    else {
                        res.json({ errMsg: 'Password Incorrect', state: 'error' })
                    }
                }
                else{
                    res.json({ errMsg: 'Account Inactivated', state: 'inactive' })
                }
                
            }
            else {
                res.json({ errMsg: 'User Not Found', state: 'error' })

            }
        })
        .catch((err) => {
            console.log(err)
        })
}


const Encrypt = {
    cryptPassword: (password) =>
        bcrypt.genSalt(10)
            .then((salt => bcrypt.hash(password, salt)))
            .then(hash => hash),

    comparePassword: (password, hashPassword) =>
        bcrypt.compare(password, hashPassword)
            .then(resp => resp)

}

const sendMail = (email) => {
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Email Verification", // Subject line
        html: `<b>Welcome to Short Url App </b> <br/> <a href=http://localhost:4200/activate/${email}>Click here to activated your account</a>` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });

}






module.exports = { addUser, validateAccount , login }
