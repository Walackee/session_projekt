const session = require('express-session')
const passport = require('passport')

module.exports = (roles) => {
	return (req, res, next) => {
		let own_role = req.session.role
		let auth = false
		auth = roles.find((role) => {return role == own_role}) == own_role ? true : false
        if (req.isAuthenticated() && roles.length !=0 && auth) {
			res.status(201).send({message: "Érvényes jogosultság!"})
            next()
        } else {
            res.status(401).send({message: "Érvénytelen jogosultság!"})
        }
    }
}