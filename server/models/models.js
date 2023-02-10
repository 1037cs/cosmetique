const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type: DataTypes.STRING, unique: true},
	password: {type: DataTypes.STRING},
	role: {type: DataTypes.STRING, defaultValue: 'U'}
})

const Basket = sequelize.define('basket', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketDevice = sequelize.define('basketDevice', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Device = sequelize.define('device', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false, unique: true},
	price: {type: DataTypes.INTEGER, allowNull: false},
	oldPrice: {type: DataTypes.INTEGER},
	rating: {type: DataTypes.INTEGER, defaultValue: 0},
	img: {type: DataTypes.STRING, allowNull: false},
	vendorCode: {type: DataTypes.STRING, allowNull: false},
	description: {type: DataTypes.STRING, allowNull: false},
	volume: {type: DataTypes.INTEGER, allowNull: false},
	volumeUnit: {type: DataTypes.STRING, allowNull: false},
	about: {type: DataTypes.TEXT, allowNull: false}
})

const DeviceInfo = sequelize.define('deviceInfo', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.STRING, allowNull: false},
	description: {type: DataTypes.STRING, allowNull: false}
})

const Rating = sequelize.define('rating', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	rate: {type: DataTypes.INTEGER, allowNull: false}
})

const Type = sequelize.define('type', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false, unique:true}
})

const Brand = sequelize.define('brand', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false, unique:true}
})

const TypeBrand = sequelize.define('typeBrand', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Device.hasOne(BasketDevice);
BasketDevice.belongsTo(Device);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(DeviceInfo,{as:'info'});
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});

module.exports = {
	User,
	Basket,
	BasketDevice,
	Device,
	Type,
	Brand,
	Rating,
	TypeBrand,
	DeviceInfo
}