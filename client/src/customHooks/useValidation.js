import {useEffect, useState} from "react";

export const useValidation = (value, validations) => {
	const [error, setError] = useState('')

	useEffect(() => {
		setError('')
		for (const validation in validations) {
			switch (validation) {
				case "minLength":
					value.length < validations[validation] ?
						setError(`поле должно содержать не менее ${validations[validation]} символов`) :
						setError('')
					break
				case "isEmpty":
					!value ? setError('заполните поле') : setError('')
					break
				case "isEmail" :
					const re =
						/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
					re.test(String(value).toLowerCase()) ? setError('') : setError('некорректный email')
					break
				case "length":
					value.length !== validations[validation] ?
						setError(`поле должно содержать ${validations[validation]} символов`) :
						setError('')
					break
				case "isZiro":
					Number(value) === 0 ? setError('заполните поле') : setError('')
					break
				case "letterNumbers":
					const regex =
						/^[a-zA-Z0-9]*$/;
					value.length === 11 && regex.test(String(value).toLowerCase()) ? setError('') : setError('неверный формат (буквы/цифры/11 символов)')
					break
				case "letters":
					const regexp =
						/^[а-яА-ЯёЁ]+$/;
					regexp.test(String(value).toLowerCase()) ? setError('') : setError('неверный формат (кириллица без пробела)')
					break
			}
		}
	}, [value])

	return {
		error
	}
}