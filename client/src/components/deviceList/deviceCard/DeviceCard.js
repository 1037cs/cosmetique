import React from 'react';
import './deviceCard.scss'
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../../utils/consts";

const DeviceCard = (props) => {
	const navigate = useNavigate()
	const priceFrmt = new Intl.NumberFormat('ru-RU').format(props.device.price)
	const oldPriceFrmt = new Intl.NumberFormat('ru-RU').format(props.device.oldPrice)
	return (
		<div className="elem" onClick={() => navigate(DEVICE_ROUTE + '/' + props.device.id)}>
			<img className="elem__image" alt="" src={process.env.REACT_APP_BASE_URL + props.device.img}/>
			<div className="elem__category">{props.device.description}</div>
			<div className="elem__title">{props.device.name}</div>
			<div className="price-wrapper">
				{props.device.oldPrice !== 0 ?
					<s className="elem__price elem__price_old">{oldPriceFrmt} ₽</s> : <span/>}
				<div className="elem__price">{priceFrmt} ₽</div>
			</div>
		</div>
	);
};

export default DeviceCard;