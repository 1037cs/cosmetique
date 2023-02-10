import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import './DeviceList.scss'
import {Context} from "../../index";
import DeviceCard from "./deviceCard/DeviceCard";

const DeviceList = observer(() => {
	const {device} = useContext(Context)

	return (
		<main className="content">
			<div className="wrapper content__wrapper">
				{device.devices.map(device =>
					<DeviceCard device={device} key={device.id}/>
				)}
				{device.devices.map(device =>
					<DeviceCard device={device} key={device.id}/>
				)}
				{device.devices.map(device =>
					<DeviceCard device={device} key={device.id}/>
				)}
			</div>
		</main>
	);
});

export default DeviceList;