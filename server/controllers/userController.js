const ApiError = require('../errors/ApiError')
const {User, Basket} = require("../models/models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (id,email,role,) => {
	const token = jwt.sign(
		{id:id,email,role},
		process.env.JWT_KEY,
		{
			expiresIn: '24h'
		}
	)
	return token
}

class UserController {
	async registration(req, res, next) {
		const {email, password, role} = req.body
		if(!email || !password)
			return next(ApiError.badRequest('Некорректный email или пароль'))
		const candidate = await User.findOne({where:{email}})

		if(candidate){
			console.log('зареган')
			return next(ApiError.internal('Пользователь уже зарегистрирован'))
		}
		const hashPassword = bcrypt.hashSync(password,5)

		const user = await User.create({email,role,password:hashPassword})
		const basket = await Basket.create({userId:user.id})

		const token = createToken(user.id,email,role)
		return res.json({token})
	}

	async login(req, res, next) {
		const {email,password} = req.body
		const user = await User.findOne({where:{email}})
		if(!user)
			return next(ApiError.badRequest('Неверный email или пароль'))

		const check = bcrypt.compareSync(password,user.password)
		if(!check)
			return next(ApiError.badRequest('Неверный email или пароль'))

		const token = createToken(user.id,user.email,user.role)
		return res.json({token})
	}



	async auth(req, res, next) {
		const token = createToken(req.user.id,req.user.email,req.user.role)
		res.json({token})
	}
}

module.exports = new UserController()