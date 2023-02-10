import React, {useState} from 'react';
import './adminModal.scss'

import closeButton from '../../../assets/closeButton.svg'
import {createType} from "../../../http/deviceAPI";
import {useInput} from "../../../customHooks/useInput";

const TypeModal = (props) => {
	const type = useInput('', {isEmpty: true})

	const addType = () => {
		createType({name: type.value}).then(() => {
			type.onChange('')
			props.hideModal()
		})
	}

	return (
		<div className={props.show ? 'adminBackground adminBackground_active' : 'adminBackground'}
		     onClick={props.hideModal}>
			<div className="adminModal" onClick={e => e.stopPropagation()}>
				<div className="adminModal__content">
					<div className="adminModal__header">
						<h1 className="adminModal__title">Добавить категорию</h1>
						<img src={closeButton} alt='' className='adminModal__close-button' onClick={props.hideModal}/>
					</div>
					<form action="" className="adminModal__form">

						{(type.isDirty && type.error) && <div className='modal__error'>{type.error}</div>}
						<input type="text" className="adminModal__input" placeholder='название категории'
						       value={type.value} onChange={e => type.onChange(e.target.value)}
						       onBlur={e => type.onBlur(e)}/>
						<button className="adminModal__button" type='button' onClick={addType}>добавить</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default TypeModal;