import React, {useContext, useEffect, useState} from 'react';
import './adminModal.scss'
import closeButton from "../../../assets/closeButton.svg";
import {Context} from "../../../index";
import {createDevice, getBrands, getTypes} from "../../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {useInput} from "../../../customHooks/useInput";
import Input from "./input/Input";

const DeviceModal = (props) => {
	const {device} = useContext(Context)

	useEffect(() => {
		getTypes().then(data => device.setTypes(data))
		getBrands().then(data => device.setBrands(data))
	}, [])

	const [array, setArray] = useState([])

	function addElemToArray() {
		setArray([...array, {title: '', description: '', number: Date.now()}])
	}

	function deleteElemFromArray(date) {
		setArray(array.filter(e => e.number !== date))
	}

	const changeInfo = (key, value, number) => {
		setArray(array.map(i => i.number === number ? {...i, [key]: value} : i))
	}

	const name = useInput('', {isEmpty: true, minLength: 5})
	const vendorCode = useInput('', {isEmpty: true, letterNumbers:true})
	const price = useInput(0, {isZiro: true})
	const [oldPrice, setOldPrice] = useState(0)
	const [img, setImg] = useState(null)
	const description = useInput('', {isEmpty: true, minLength: 3})
	const [volume, setVolume] = useState(0)
	const volumeUnit = useInput('',{letters:true})
	const [about, setAbout] = useState('')

	const addDevice = () => {
		const formData = new FormData()
		formData.append("name", name.value)
		formData.append("price", `${price.value}`)
		formData.append("oldPrice", `${oldPrice.value}`)
		formData.append("img", img)
		formData.append("vendorCode", vendorCode.value)
		formData.append("description", description.value)
		formData.append("volume", `${volume.value}`)
		formData.append("volumeUnit", volumeUnit.value)
		formData.append("about", about)
		formData.append("brandId", device.selectedBrand.id)
		formData.append("typeId", device.selectedType.id)
		formData.append("info", JSON.stringify(array))

		createDevice(formData).then(data => {
			name.onChange('')
			price.onChange(0)
			setOldPrice(0)
			setImg(null)
			vendorCode.onChange('')
			description.onChange('')
			setVolume(0)
			volumeUnit.onChange('')
			setAbout('')
			props.hideModal()
		})
	}

	return (
		<div className={props.show ? 'adminBackground adminBackground_active' : 'adminBackground'}
		     onClick={props.hideModal}>
			<div className="adminModal" onClick={e => e.stopPropagation()}>
				<div className="adminModal__content">
					<div className="adminModal__header">
						<h1 className="adminModal__title">Добавить товар</h1>
						<img src={closeButton} alt='' className='adminModal__close-button' onClick={props.hideModal}/>
					</div>
					<form action="" className="adminModal__form">
						{(name.isDirty && name.error) && <div className='modal__error'>{name.error}</div>}
						<Input id={'name'} value={name.value} onChange={name.onChange} onBlur={name.onBlur}
						       isDirty={name.isDirty} error={name.error}/>

						{(vendorCode.isDirty && vendorCode.error) &&
							<div className='modal__error'>{vendorCode.error}</div>}
						<Input id={'vendorCode'} value={vendorCode.value} onChange={vendorCode.onChange}
						       onBlur={vendorCode.onBlur}/>

						{(description.isDirty && description.error) &&
							<div className='modal__error'>{description.error}</div>}
						<Input id={'subtitle'} value={description.value} onChange={description.onChange}
						       onBlur={description.onBlur}/>

						<Input id={'volume'} value={volume} onChange={setVolume}/>

						{(volumeUnit.isDirty && volumeUnit.error) &&
							<div className='modal__error'>{volumeUnit.error}</div>}
						<Input id={'volumeUnit'} value={volumeUnit.value} onChange={volumeUnit.onChange} onBlur={volumeUnit.onBlur}/>

						<select required className='adminModal__select' defaultValue='выберите категорию'
						        onChange={e => device.setSelectedType(device.types.filter(i => i.name === e.target.value)[0])}>
							<option disabled>выберите категорию</option>
							{device.types.map(type =>
								<option key={type.id}>{type.name}</option>
							)}
						</select>

						<select required className='adminModal__select' defaultValue='выберите бренд'
						        onChange={e => device.setSelectedBrand(device.brands.filter(i => i.name === e.target.value)[0])}>
							<option disabled>выберите бренд</option>
							{device.brands.map(brand =>
								<option key={brand.id}> {brand.name}</option>
							)}
						</select>

						{(price.isDirty && price.error) && <div className='modal__error'>{price.error}</div>}
						<Input id={'price'} value={price.value} onChange={price.onChange} onBlur={price.onBlur}/>
						{(oldPrice.length > 0 && Number(oldPrice) < Number(price.value)) &&
							<div className='modal__error'>прежняя цена не может быть ниже новой</div>}
						<Input id={'oldPrice'} value={oldPrice} onChange={setOldPrice}/>

						{about.length < 10 &&
							<div className='modal__error'>поле должно содержать более 10 символов</div>}
						<label className='input-label'>описание:</label>
						<textarea className='adminModal__input adminModal__input_big'
						          value={about} onChange={e => setAbout(e.target.value)}/>

						<input type='file' onChange={e => setImg(e.target.files[0])}/>

						<img src={closeButton} alt=""
						     className="adminModal__close-button adminModal__close-button_transform"
						     onClick={addElemToArray}/>

						{array.map(elem =>
							<div className="input-wrapper" key={elem.number}>
								<input type="text" className="adminModal__input" style={{width: '130px'}}
								       placeholder='свойство' value={elem.title}
								       onChange={(e) => changeInfo('title', e.target.value, elem.number)}/>
								<input type="text" className="adminModal__input" style={{width: '130px'}}
								       placeholder='значение' value={elem.description}
								       onChange={(e) => changeInfo('description', e.target.value, elem.number)}/>
								<img src={closeButton} alt="" className="adminModal__close-button"
								     onClick={() => deleteElemFromArray(elem.number)}/>

							</div>
						)}
						{name.value && vendorCode.value && price.value && img && description.value && about && device.selectedBrand.id && device.selectedType.id ?
						<button type='button' className="adminModal__button" onClick={addDevice}>добавить</button> :
							<button type='button' disabled={true} className="adminModal__button_disabled" onClick={addDevice}>добавить</button>
						}
					</form>
				</div>
			</div>
		</div>
	);
};

export default observer(DeviceModal);