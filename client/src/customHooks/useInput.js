import {useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (initialValue,validations) => {
	const [value,setValue] = useState(initialValue)
	const [isDirty,setDirty] = useState(false)

	const validation = useValidation(value, validations)

	const onChange = (string) => {
		setValue(string)
		setDirty(false)
	}

	const onBlur = (e) => {
		setDirty(true)
	}

	return {
		value,
		onChange,
		onBlur,
		isDirty,
		...validation
	}
}