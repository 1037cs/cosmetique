import React, {useContext, useRef, useState} from 'react';
import './sortSelect.scss'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const SortSelect = observer(({options, title}) => {
	const [show, setShow] = useState(false)
	const {device} = useContext(Context)

	const sort = (id) => {
		device.devices.sort(function (a, b) {
			switch (id) {
				case 'priceUp':
					return a.price - b.price
					break
				case 'priceDown':
					return b.price - a.price
					break
				case 'alphabet':
					if (a.name < b.name) //сортируем строки по возрастанию
						return -1
					if (a.name > b.name)
						return 1
					return 0 // Никакой сортировки
					break
			}
		})
	}

	return (
		<div className='sort-select'>
			<div className="sort-selector" onClick={() => setShow(!show)}
			     style={show ? {color: '#ed7b84'} : {color: 'black'}}>{title}
			</div>
			<div className={show ? 'sort-option sort-option_active' : 'sort-option'}>
				{options.map((elem) =>
					<span key={elem.id} className='sort-option__elem' onClick={() => sort(elem.id)}>{elem.title}</span>
				)}
			</div>
		</div>
	);
});

export default SortSelect;