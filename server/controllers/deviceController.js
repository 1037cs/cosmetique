const path = require('path')
const uuid = require('uuid')
const {Device, DeviceInfo} = require("../models/models");
const ApiError = require('../errors/ApiError')

class BrandController {
	async create(req, res, next) {
		try {
			let {name, price, oldPrice, brandId, typeId, info, vendorCode, description,volume,volumeUnit,about} = req.body
			const {img} = req.files
			let filename = uuid.v4() + '.jpg'
			img.mv(path.resolve(__dirname, '..', 'static', filename))

			const device = await Device.create({
				name,
				price,
				brandId,
				oldPrice,
				typeId,
				img: filename,
				vendorCode,
				description,
				volume,
				volumeUnit,
				about,
				info
			})

			if (info) {
				info = JSON.parse(info)
				info.forEach(i => {
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id
					})
				})
			}

			return res.json(device)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		let {brandId, typeId, limit, page} = req.query
		let devices
		page = page || 1
		limit = limit || 12
		const offset = page * limit - limit

		if (!brandId && !typeId)
			devices = await Device.findAndCountAll({limit, offset})
		else if (!brandId && typeId)
			devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
		else if (brandId && !typeId)
			devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
		else
			devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})

		return res.json(devices)
	}

	async getById(req, res) {
		const {id} = req.params
		const device = await Device.findOne(
			{
				where: {id},
				include: [{model: DeviceInfo, as: 'info'}]
			}
		)
		return res.json(device)
	}
}

module.exports = new BrandController()