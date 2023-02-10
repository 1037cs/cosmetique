import React, {useContext, useEffect} from 'react';
import DeviceList from "../deviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {getBrands, getDevices, getTypes} from "../../http/deviceAPI";
import SortSelect from "../sortSelect/SortSelect";

const MainShop = observer(() => {
	const {device} = useContext(Context)
	const {user} = useContext(Context)

	useEffect(() => {
		getTypes().then(data => device.setTypes(data))
		getBrands().then(data => device.setBrands(data))
		getDevices().then(data => device.setDevices(data.rows))
		document.title = 'Main | Cosmetique'
	}, [])

	return (
		<div className='wrapper' style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
			<SortSelect
				options={[{id: 'priceUp', title: 'по возрастанию цены'},
					{id: 'priceDown', title: 'по убыванию цены'},
					{id:'alphabet',title:'по алфавиту'}]}
				title={'Сортировать'}/>
			<DeviceList/>
		</div>
	);
});

export default MainShop;