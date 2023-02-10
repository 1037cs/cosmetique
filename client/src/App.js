import Router from "./components/Router";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/header/Header";
import './components/app/app.scss'
import Footer from "./components/footer/Footer";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {MutatingDots} from "react-loader-spinner";

const App = observer(() => {
	const {user} = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetch = async() => {
			try {
				const data = await check()
				user.setUser(data)
				user.setIsAuth(true)
				if (data.role === 'ADMIN')
					user.setIsAdmin(true)
			} catch (e) {
				console.log(e)
			} finally {
				setLoading(false)
			}
		}
		fetch()
	}, [])

	if (loading)
		return <MutatingDots height="100"
		                     width="100"
		                     color="#ED7B84"
		                     secondaryColor='#ED7B84'
		                     radius='12.5'
		                     ariaLabel="mutating-dots-loading"
		                     wrapperStyle={{
			                     width: '100vw',
			                     height: '100vh',
			                     display: 'flex',
			                     justifyContent: 'center',
			                     alignItems: 'center'
		                     }}
		                     wrapperClass=""
		                     visible={true}/>

	return (
		<BrowserRouter>
			<Header/>
			<Router/>
			<Footer/>
		</BrowserRouter>
	)
})

export default App;
