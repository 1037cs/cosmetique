import React, {useState} from 'react';
import './adminModal.scss'

import closeButton from '../../../assets/closeButton.svg'
import {createBrand} from "../../../http/deviceAPI";
import {useInput} from "../../../customHooks/useInput";

const BrandModal = (props) => {

	const brand = useInput('',{isEmpty:true})

	const addBrand = () => {
		createBrand({name: brand.value}).then(() => {
			brand.onChange('')
			props.hideModal()
		})
	}

	return (
		<div className={props.show ? 'adminBackground adminBackground_active' : 'adminBackground'}
		     onClick={props.hideModal}>
			<div className="adminModal" onClick={e => e.stopPropagation()}>
				<div className="adminModal__content">
					<div className="adminModal__header">
						<h1 className="adminModal__title">Добавить бренд</h1>
						<img src={closeButton} alt='' className='adminModal__close-button' onClick={props.hideModal}/>
					</div>
					<form action="" className="adminModal__form">

						{(brand.isDirty && brand.error) && <div className='modal__error'>{brand.error}</div>}
						<input type="text" className="adminModal__input" placeholder='название бренда'
						       value={brand.value} onChange={e => brand.onChange(e.target.value)}
						       onBlur={e => brand.onBlur(e)}/>
						<button type='button' className="adminModal__button" onClick={addBrand}>добавить</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BrandModal;