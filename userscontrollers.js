const fs = require('fs')
const mysql = require('mysql')
const sql = require('./databaseconnection')
const bcrypt = require('bcrypt')
const saltrounds = 10
const secret = fs.readFileSync('./private.pem').toString()
const passport = require('passport')
/*
exports.osszesfelhasznalokeler = (req, res, next) => {
	
}
*/
/*
exports.sajatfelhasznaloleker = (req, res, next) => {
	
}
*/

exports.regisztracio = (req, res, next) => {	
	let lekerdezes = 'SELECT ??, ?? FROM ?? WHERE ?? = ?'
	let inserts = ['id', 'email', 'users','email',req.body.email]
	lekerdezes = mysql.format(lekerdezes, inserts)
	sql.query(lekerdezes,
		(err, user) => {
			if (err) {
				return res.status(500).json({message: err.sqlMessage})
			} else {
				if(!user.length){
					bcrypt.hash(req.body.password, saltrounds, (err, hash) => {
						if(err){
							return res.status(500).json({message: err})
						} else {
							let lekerdezes = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)'
							let inserts = ['users','id','email','password', 'NULL', req.body.email, hash]
							lekerdezes = mysql.format(lekerdezes, inserts)
							sql.query(lekerdezes,(err, dl) => {
								if (err) {
									return res.status(500).json({message: err.sqlMessage})
								} else {
									const id = dl.insertId
									req.login(id,(err) => {
										if(err){
											return res.status(500).json({message: err})
										}
									})
									return res.status(201).json({message:'Felhasználó létrehozva!'})}
							})
						}
					})
				} else {
					return res.status(409).json({message:'Ez a felhasználó már létezik!'})
				}
			}
		})	
}

exports.bejelentkezes = (req, res, next) => {	
	let lekerdezes = 'SELECT * FROM ?? WHERE ?? = ?'
	let inserts = ['users','email',req.body.email]
	lekerdezes = mysql.format(lekerdezes, inserts)
	sql.query(lekerdezes,(err, user) => {
			if (err) {
				return res.status(500).json({message: err.sqlMessage})
			} else {
				if(user.length < 1){
					res.status(401).json({message:'Még nem regisztrált!'})
				} else {
					bcrypt.compare(req.body.password, user[0].password, (err, result) => {
						if(err){
							res.status(401).json({
								error: err})
						} else {
							if(result){
								const id = user[0].id
								req.login(id,(err) => {
									if(err){
										return res.status(500).json({message: err})
									}
								})
								return res.status(201).json({message:'Sikeres bejelentkezés!'})
							} else {
								res.status(401).json({message:'Sikertelen azonosítás 2!'})
							}
						}
					})
				}
			}
		})
}

exports.ellenorzes = (req, res, next) => {
	console.log(req.user)
	console.log(req.session)
	console.log(req.isAuthenticated())
	res.status(201).json(req.session)
}

passport.serializeUser((id, done) => {
	done(null, id)
})

passport.deserializeUser((id, done) => {
	done(null, id)
})

/*
exports.sajatfelhasznalotorol = (req, res, next) => {
	
}
*/