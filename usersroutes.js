"use strict"
const express = require('express')
const router = express.Router()
const {validatebody, validateparams, schemas } = require('./validation')
const userscontrollers = require('./userscontrollers')
const checkauth = require('./check-auth')

//router.get(/osszesfelhasznaloleker/, checkauth, userscontrollers.osszesfelhasznalokeler)
//router.get(/sajatfelhasznaloleker/, validateparams(schemas.schema2), checkauth, userscontrollers.sajatfelhasznaloleker)
router.post(/regisztracio/, validatebody(schemas.schema1), userscontrollers.regisztracio)
router.get(/ellenorzes/, userscontrollers.ellenorzes)
router.post(/bejelentkezes/, validatebody(schemas.schema1), userscontrollers.bejelentkezes)
//router.delete(/sajatfelhasznalotorol/, checkauth, userscontrollers.sajatfelhasznalotorol)

module.exports=router