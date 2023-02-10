import {$authHost, $host} from "./index";


export async function createType(type){
	const {data} = await $authHost.post('api/type',type)
	return data
}

export async function getTypes(){
	const {data} = await $host.get('api/type')
	return data
}

export async function createBrand(brand){
	const {data} = await $authHost.post('api/brand',brand)
	return data
}

export async function getBrands(){
	const {data} = await $host.get('api/brand')
	return data
}

export async function createDevice(device){
	const {data} = await $authHost.post('api/device',device)
	return data
}

export async function getDevices(){
	const {data} = await $host.get('api/device')
	return data
}

export async function getDeviceById(id){
	const {data} = await $host.get('api/device/'+id)
	return data
}