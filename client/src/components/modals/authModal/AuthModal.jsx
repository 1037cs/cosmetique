import React, {useContext, useState} from 'react';
import closeButton from "../../../assets/closeButton.svg";
import {useInput} from "../../../customHooks/useInput";
import {login, registration} from "../../../http/userAPI";
import './authModal.scss'
import {SHOP_ROUTE} from "../../../utils/consts";
import {Context} from "../../../index";
import {useNavigate} from "react-router-dom";

const AuthModal = ({show, hideModal}) => {
	const [modalType, setModalType] = useState('login')
	const {user} = useContext(Context)
	const email = useInput('', {isEmpty: true})
	const password = useInput('', {isEmpty: true})
	const navigate = useNavigate()

	const fetch = async () => {
		try {
			const response = modalType === 'login'
				? await login(email.value, password.value)
				: await registration(email.value, password.value)
			user.setUser(response)
			user.setIsAuth(true)
			if (response.role === 'ADMIN')
				user.setIsAdmin(true)
			hideModal(false)
			navigate(SHOP_ROUTE)
		} catch (e) {
			alert(e.response.data.message)
		}
	}

	return (
		<div className={show ? 'background background_active' : 'background'} onClick={() => hideModal(false)}>
			<div className={show ? "modal modal_active" : "modal"}
			     onClick={(e) => e.stopPropagation()}>
				<img src={closeButton} alt='' className='modal__close-button' onClick={() => hideModal(false)}/>
				<div className="modal__content">
					{modalType === 'login'
						? <h1 className="modal__title">войти</h1>
						: <h1 className="modal__title">зарегистрироваться</h1>}

					<form action="" className="modal__form">
						{(email.isDirty && email.error) && <div className='modal__error'>{email.error}</div>}
						<input type="text" className="modal__input" placeholder='электронная почта'
						       value={email.value} onChange={e => email.onChange(e.target.value)}
						       onBlur={e => email.onBlur(e)}/>
						{(password.isDirty && password.error) && <div className='modal__error'>{password.error}</div>}
						<input type="password" className="modal__input" placeholder='пароль'
						       value={password.value} onChange={e => password.onChange(e.target.value)}
						       onBlur={e => password.onBlur(e)}/>

						{modalType === 'login'
							? <span onClick={() => setModalType('reg')}
							        className="modal__redirect">Еще нет аккаунта?</span>
							: <span onClick={() => setModalType('login')}
							        className="modal__redirect">Уже есть аккаунт?</span>}

						{modalType === 'login'
							? <button type='button' className="modal__button" onClick={fetch}>войти</button>
							: <button type='button' className="modal__button" onClick={fetch}>создать аккаунт</button>}
					</form>

				</div>
			</div>
		</div>
	);
};

export default AuthModal;