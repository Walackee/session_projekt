const fs = require('fs')
const mysql = require('mysql')
const sql = require('./databaseconnection')
const bcrypt = require('bcrypt')
const saltrounds = 10
const secret = fs.readFileSync('./private.pem', 'utf8').toString()
const secured_views = JSON.parse(fs.readFileSync('./secured_views.json', 'utf8'))
const all_buttons = JSON.parse(fs.readFileSync('./buttons.json', 'utf8'))
const passport = require('passport')

exports.regisztracio = (req, res, next) => {	
	let lekerdezes = 'SELECT ??, ?? FROM ?? WHERE ?? = ?'
	let inserts = ['id', 'email', 'users','email',req.body.email]
	lekerdezes = mysql.format(lekerdezes, inserts)
	sql.query(lekerdezes,
		(err, user) => {
			if (err) {
				res.status(500).send({message: err.sqlMessage})
			} else {
				if(!user.length){
					bcrypt.hash(req.body.password, saltrounds, (err, hash) => {
						if(err){
							res.status(500).send({message: err})
						} else {
							let lekerdezes = 'INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)'
							let inserts = ['users','id','email','password','role','NULL',req.body.email,hash,'student']
							lekerdezes = mysql.format(lekerdezes, inserts)
							sql.query(lekerdezes,(err, dl) => {
								if (err) {
									res.status(500).send({message: err.sqlMessage})
								} else {
									console.log()
									const id = dl.insertId
									req.login(id,(err) => {
										if(err){
											res.status(500).send({message: err})
										}
									})
									req.session.email = req.body.email
									req.session.role = 'student'
									req.session.save()
									let buttons = all_buttons.find((element) => {return Object.keys(element) == req.session.role})
									buttons = buttons[req.session.role]
									res.status(201).send({buttons: buttons})}
							})
						}
					})
				} else {
					res.status(409).send({message:'Ez a felhasználó már létezik!'})
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
				return res.status(500).send({message: err.sqlMessage})
			} else {
				if(!user.length){
					res.status(401).send({message:'Még nem regisztrált!'})
				} else {
					bcrypt.compare(req.body.password, user[0].password, (err, result) => {
						if(err){
							res.status(401).send({error: err})
						} else {
							if(result){
								const id = user[0].id
								req.login(id,(err) => {
									if(err){
										res.status(500).send({message: err})
									}
								})
								req.session.email = req.body.email
								req.session.role = user[0].role
								req.session.save()
								let buttons = all_buttons.find((element) => {return Object.keys(element) == req.session.role})
								buttons = buttons[req.session.role]
								res.status(201).send({buttons: buttons})
							} else {
								res.status(401).send({message:'Sikertelen azonosítás 2!'})
							}
						}
					})
				}
			}
		})
}

exports.kijelentkezes = (req, res, next) => {
	req.logout()
	req.session.destroy()
	res.clearCookie('tesztsorozat')
	if(req.isAuthenticated()){
		res.status(401).send({message:'Sikertelen kijelentkezes!'})
	} else {
		res.status(201).send({message:'Sikeres kijelentkezes!'})
	}
}

exports.ellenorzes = (req, res, next) => {
	let own_role = req.session.role
	let email = req.session.email
	let buttons = all_buttons.find((element) => {return Object.keys(element) == own_role})
	buttons = buttons[own_role]
	if(req.isAuthenticated()){
		res.status(201).send({email: req.session.email, buttons: buttons})
	} else {
		res.status(201).send({email: '', buttons: []})	
	}
}

exports.jogosultsag = (req, res, next) => {
	let path = req.body.path
	let own_role = req.session.role
	let auth = false
	auth = secured_views.find((element) => {return element.path == path}).roles.find((role) => {return role == own_role}) == own_role ? true : false
	console.log('own_role',own_role)
	console.log('auth',auth)
	if(req.session && req.isAuthenticated() && auth){
		res.status(201).send({resp: true})
	} else {
		res.status(201).send({resp: false})	
	}
}

exports.tesztsorozat = (req, res, next) => {
	res.status(201).send({message: 'Tesztsorozat tartalom'})
	next()
}

exports.kiertekeles = (req, res, next) => {
	res.status(201).send({message: 'Kiértékelés tartalom'})
	next()
}

exports.admin = (req, res, next) => {
	res.status(201).send({message: 'Admin tartalom'})
	next()
}

passport.serializeUser((id, done) => {
	done(null, id)
})

passport.deserializeUser((id, done) => {
	done(null, id)
})
