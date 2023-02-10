import React from 'react';
import './input.scss'

const Input = (props) => {
	const numberTypes = ['price', 'oldPrice', 'volume']

	const labelMenu = (label) => {
		switch (label) {
			case 'name':
				return 'название'
			case 'vendorCode':
				return 'артикул'
			case 'subtitle':
				return 'подзаголовок'
			case 'volume':
				return 'объем'
			case 'volumeUnit':
				return 'единица объема'
			case 'price':
				return 'новая цена'
			case 'oldPrice':
				return 'прежняя цена'
		}
	}

	return (
		<div className='input-wrapper'>
			<label htmlFor={props.id} className='input-label'>{labelMenu(props.id)}:</label>
			<input id={props.id}
			       type={numberTypes.includes(props.id) ? 'number' : 'text'}
			       className="input"
			       value={props.value}
			       onChange={!numberTypes.includes(props.id) ? e => props.onChange(e.target.value) : e => props.onChange(Number(e.target.value))}
			       onBlur={props.onBlur ? e => props.onBlur(e) : null}
			       min={numberTypes.includes(props.id) ? '0' : null}/>
		</div>
	);
};

export default Input;