"use strict"
const express = require('express')
const router = express.Router()
const {validatebody, validateparams, schemas } = require('./validation')
const userscontrollers = require('./userscontrollers')
const checkauth = require('./check-auth')

router.post(/regisztracio/, validatebody(schemas.schema1), userscontrollers.regisztracio)
router.post(/bejelentkezes/, validatebody(schemas.schema1), userscontrollers.bejelentkezes)
router.get(/ellenorzes/, userscontrollers.ellenorzes)
router.post(/jogosultsag/, validatebody(schemas.schema3), userscontrollers.jogosultsag)
router.get(/kijelentkezes/, checkauth(['student','teacher','admin']), userscontrollers.kijelentkezes)
router.get(/tesztsorozat/, checkauth(['student','teacher']), userscontrollers.tesztsorozat)
router.get(/kiertekeles/, checkauth(['teacher']), userscontrollers.kiertekeles)
router.get(/admin/, checkauth(['admin']), userscontrollers.admin)

module.exports=router