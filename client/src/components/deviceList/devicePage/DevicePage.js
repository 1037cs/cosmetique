import React, {useEffect, useState} from 'react';
import './devicePage.scss'
import {useParams} from "react-router-dom";
import {getDeviceById} from "../../../http/deviceAPI";


const DevicePage = () => {
	const [device, setDevice] = useState({info: []})
	const [selectedInfo, setSelectedInfo] = useState('description')
	const {id} = useParams()
	const priceFrmt = new Intl.NumberFormat('ru-RU').format(device.price)
	const oldPriceFrmt = new Intl.NumberFormat('ru-RU').format(device.oldPrice)

	useEffect(() => {
		getDeviceById(id).then(data => {
			setDevice(data)
			document.title= data.name+' | Cosmetique'
		})
		console.log(device.info)
	}, [])

	return (
		<main className="content">
			<div className="wrapper content__item item">
				<section className="item__container">
					<img className="item__photo" src={process.env.REACT_APP_BASE_URL + device.img} alt=""/>
					<div className="item__info">
						<div className="item__header">
							<span className="item__category">{device.description}</span>
							<h1 className="item__name">{device.name}</h1>
						</div>
						<p className="item__vendor-code">Артикул: {device.vendorCode}</p>
						<div className="volume-wrapper">
							<div className="item__volume">{device.volume}</div>
							<div className="item__volume-unit">{device.volumeUnit}</div>
						</div>
						<div className="price-wrapper">
							<span className="item__price">{priceFrmt} ₽</span>
							<s className="item__price item__price_old">{oldPriceFrmt} ₽</s>
						</div>
						<button className="item__basket-button">Добавить в корзину</button>
					</div>
				</section>
				<section className="item__bottom-container">
					<div className="item__menu menu">
						<h2 className={selectedInfo === 'description' ? "menu__elem menu__elem_active" : "menu__elem"}
						    onClick={() => setSelectedInfo('description')}>Описание
						</h2>
						<h2 className={selectedInfo === 'info' ? "menu__elem menu__elem_active" : "menu__elem"}
						    onClick={() => setSelectedInfo('info')}>Характеристики
						</h2>
					</div>
					<div className="item__selectedInfo">
						{selectedInfo === 'description' ?
							<div className='item__about'>{device.about}</div> :
							<div className='item__about'>{device.info.map(elem =>
								<div>
									<h3 className='item__info-title'>{elem.title}</h3> : <span>{elem.description}</span>
								</div>)}</div>
						}
					</div>
				</section>
			</div>
		</main>
	);
};

export default DevicePage;