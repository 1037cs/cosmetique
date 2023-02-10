import {DEVICE_ROUTE, SHOP_ROUTE} from "./utils/consts";
import MainShop from "./components/mainShop/MainShop";
import DevicePage from "./components/deviceList/devicePage/DevicePage";

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		Component: MainShop
	},
	{
		path: DEVICE_ROUTE + '/:id',
		Component: DevicePage
	}
]