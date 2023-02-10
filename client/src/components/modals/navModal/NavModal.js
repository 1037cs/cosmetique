import React, {useContext} from 'react';
import './navModal.scss'
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {getDevices} from "../../../http/deviceAPI";

const NavModal = (props) => {
	const {device} = useContext(Context)

	const brandFilter = (brand) => {
		getDevices().then(data => {
			device.setDevices(data.rows)
			device.setDevices(device.devices.filter(e => e.brandId === brand))
		})
	}

	return (
		<div className={props.show ? 'nav-modal-background nav-modal-background_active' : 'nav-modal-background'}>
			<div className="wrapper">
				{device.brands.map(brand =>
					<div key={brand.id} className='nav-modal__elem'
					     onClick={() => brandFilter(brand.id)}>{brand.name}</div>
				)}
			</div>
		</div>
	);
};

export default observer(NavModal);