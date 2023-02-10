import {makeAutoObservable} from "mobx";

export default class UserStore {
	constructor() {
		this._types = []
		this._brands = []
		this._devices = []
		this._selectedType = {}
		this._selectedBrand = {}
		makeAutoObservable(this)
	}

	setBrands(brands) {
		this._brands = brands
	}

	setTypes(types) {
		this._types = types
	}

	setDevices(devices) {
		this._devices = devices
	}

	get types() {
		return this._types
	}

	get brands() {
		return this._brands
	}

	get devices() {
		return this._devices
	}

	setSelectedBrand(brand) {
		this._selectedBrand = brand
	}

	setSelectedType(type) {
		this._selectedType = type
	}

	get selectedBrand() {
		return this._selectedBrand
	}

	get selectedType() {
		return this._selectedType
	}
}