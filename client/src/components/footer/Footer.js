import React from 'react';
import './footer.scss'

import vkLogo from "../../assets/social/vkLogo.svg"
import instagramLogo from "../../assets/social/instagramLogo.svg"
import telegramLogo from "../../assets/social/telegramLogo.svg"

const Footer = () => {
	return (
		<footer className="footer">
			<div className="wrapper footer__wrapper">
				<nav className="social-nav">
					<img className="social-nav__el link" alt="" src={vkLogo}/>
					<img className="social-nav__el link" alt="" src={instagramLogo}/>
					<img className="social-nav__el link" alt="" src={telegramLogo}/>
				</nav>
				<span className="header__logo logo">CQ</span>
				<div className="footer__address address">
					<span className="address__city">Самара, Московское шоссе, 43 </span>
					<span className="address__number">8 927 111 22 33</span>
					<span className="address__email">info@cq.com</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;