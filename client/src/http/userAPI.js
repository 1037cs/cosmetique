import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";


export const registration = async (email, password) => {
	const userRole = email === 'admin@admin.ru' ? 'ADMIN' : 'USER'
	const {data} = await $host.post('api/user/reg', {email, password, role: userRole})
	localStorage.setItem('token', data.token)
	const {role} = jwtDecode(data.token)
	console.log(role)
	return jwtDecode(data.token)
}

export const login = async (email, password) => {
	const {data} = await $host.post('api/user/login', {email, password})
	localStorage.setItem('token', data.token)
	console.log(jwtDecode(data.token).role)
	return jwtDecode(data.token)
}

export const check = async () => {
	const {data} = await $authHost.get('api/user/auth')
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}