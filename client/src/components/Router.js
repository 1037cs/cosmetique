import React, {Component, useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {publicRoutes} from "../routes";
import {ADMIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import Admin from "./admin/Admin";
import {observer} from "mobx-react-lite";

const Router = observer(() => {
	const {user} = useContext(Context)

	return (
		<Routes>
			{user.isAdmin && <Route path={ADMIN_ROUTE} element={<Admin/>}/>}
			{publicRoutes.map(({path, Component}) =>
				<Route key={path} path={path} element={<Component/>}/>
			)}
			<Route path='*' element={<Navigate to={SHOP_ROUTE}/>} />
		</Routes>
	);
});

export default Router;