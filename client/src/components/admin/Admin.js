import React, {useEffect, useState} from 'react';
import './admin.scss'
import TypeModal from "../modals/adminModals/TypeModal";
import BrandModal from "../modals/adminModals/BrandModal";
import DeviceModal from "../modals/adminModals/DeviceModal";

const Admin = () => {
	const [typeVisibility, setTypeVisibility] = useState(false)
	const [brandVisibility, setBrandVisibility] = useState(false)
	const [deviceVisibility, setDeviceVisibility] = useState(false)

	useEffect(() => {
			document.title = 'Admin Panel | Cosmetique'
		}
		, [])
	return (
		<div>
			<div className="wrapper content">
				<button className="add-button" onClick={() => setDeviceVisibility(true)}>Добавить товар</button>
				<button className="add-button" onClick={() => setTypeVisibility(true)}>Добавить тип</button>
				<button className="add-button" onClick={() => setBrandVisibility(true)}>Добавить бренд</button>
			</div>
			<TypeModal show={typeVisibility} hideModal={() => setTypeVisibility(false)}/>
			<BrandModal show={brandVisibility} hideModal={() => setBrandVisibility(false)}/>
			<DeviceModal show={deviceVisibility} hideModal={() => setDeviceVisibility(false)}/>
		</div>
	);
};

export default Admin;