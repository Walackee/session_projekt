"use strict"
const port = process.env.SERVER_PORT
const backend = `http://localhost:${port}`
const fs = require('fs')
const secret = fs.readFileSync("./private.pem").toString()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require("compression")
const helmet = require('helmet')
const morgan = require("morgan")
const cookieparser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const mysqlstore = require('express-mysql-session')(session)
const session_options = {
	host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}
const sessionstore = new mysqlstore(session_options)

const usersroutes = require('./usersroutes')

const static_file_options = {dotfiles: 'allow'}
const frontend = __dirname + '/frontend/dist/'
//const elearning = __dirname + '/host/elearning/dist/'
//const szemelyes = __dirname + '/host/szemelyes/dist/'

app.use(cors({  
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST"],
    credentials: true
}))

//app.use(cors())
app.use(helmet())
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(compression())

app.use(cookieparser())
app.use(session({
	name: 'tesztsorozat',
    resave: false,
    saveUninitialized: false,
    secret: secret,
	store: sessionstore,
	//cookie: { maxAge: 600000000, secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())

/*
app.use((req, res, next) => {
    if (!req.user && !req.isAuthenticated()) {
        res.clearCookie('tesztsorozat')		
    }
	next()
})
*/

//app.use(express.static(elearning,options))
app.use(express.static(frontend,static_file_options))
app.use('/tesztsorozat',express.static(frontend))
//app.use('/',express.static(elearning))
//app.use('/szemelyes',express.static(szemelyes))

app.use('/felhasznalok', usersroutes)

app.use((req, res, next) => {
	const error = new Error('Az erőforrás nem található!')
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500).send({message: error.message})
})

module.exports = app;
