import React, {useContext} from 'react';
import loopLogo from "../../../assets/header/loopLogo.svg";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE} from "../../../utils/consts";
import settingsLogo from "../../../assets/header/settingsLogo.svg";
import exitLogo from "../../../assets/header/exitLogo.svg";
import userLogo from "../../../assets/header/userLogo.svg";
import basketLogo from "../../../assets/header/cartLogo.svg";
import {Context} from "../../../index";

const HeaderNavigation = ({logOut, setLogVisible}) => {
	const {user} = useContext(Context)

	return (
		<nav className="header__user-nav user-nav">
			<img src={loopLogo} alt="" className="user-nav__elem link"/>
			{user.isAdmin && <NavLink to={ADMIN_ROUTE}><img src={settingsLogo} alt=""
			                                                className="user-nav__elem link link_settings"/></NavLink>}
			{user.isAuth
				? <img src={exitLogo} alt="" className="user-nav__elem link" onClick={logOut}/>
				: <img src={userLogo} alt="" className="user-nav__elem link"
				       onClick={() => setLogVisible(true)}/>}
			<img src={basketLogo} alt="" className="user-nav__elem link"/>
		</nav>
	);
};

export default HeaderNavigation;