import React, {useContext, useState} from 'react';
import './header.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import NavModal from "../modals/navModal/NavModal";
import {getDevices} from "../../http/deviceAPI";
import HeaderNavigation from "./nav/HeaderNavigation";
import FooterNavigation from "./nav/FooterNavigation";
import AuthModal from "../modals/authModal/AuthModal";


const Header = observer(() => {
	const {user} = useContext(Context)
	const {device} = useContext(Context)
	let [authModalVisible, setAuthModalVisible] = useState(false)
	let [navModalVisible, setNavModalVisible] = useState(false)
	const navigate = useNavigate()

	function logOut() {
		user.setUser({})
		user.setIsAuth(false)
		user.setIsAdmin(false)
		localStorage.removeItem('token')
		navigate(SHOP_ROUTE)
	}

	function refreshDevices() {
		getDevices().then(data => device.setDevices(data.rows))
	}

	return (
		<header className="header">
			<div className="wrapper header__wrapper">
				<div className="header__header">
					<NavLink to={SHOP_ROUTE} className="header__logo logo">CQ</NavLink>
					<HeaderNavigation logOut={logOut} setLogVisible={setAuthModalVisible}/>
				</div>
				<div className="header__footer">
					<FooterNavigation navModalVisible={navModalVisible} setNavModalVisible={setNavModalVisible}
					                  refreshDevices={refreshDevices}/>
				</div>
			</div>
			<AuthModal show={authModalVisible} hideModal={setAuthModalVisible}/>
		</header>
	);
});

export default Header;