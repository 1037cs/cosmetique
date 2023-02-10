import React from 'react';
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../../../utils/consts";
import NavModal from "../../modals/navModal/NavModal";

const FooterNavigation = ({refreshDevices, setNavModalVisible, navModalVisible}) => {
	return (
		<nav className="site-nav">
			<NavLink to={SHOP_ROUTE} className="site-nav__elem site-nav__elem_active"
			         onClick={() => refreshDevices()}>популярное</NavLink>
			<div className="site-nav__elem" onMouseEnter={() => setNavModalVisible(true)}
			     onMouseLeave={() => setNavModalVisible(false)}
			     style={navModalVisible ? {color: '#ED7B84'} : {color: 'black'}}>бренды
				<NavModal show={navModalVisible} hideModal={() => setNavModalVisible(false)}/></div>
			<span className="site-nav__elem">новинки</span>
			<span className="site-nav__elem">скидки</span>
		</nav>
	);
};

export default FooterNavigation;