import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';




import { getListings, getDesigners } from '../../store/user';


const Sell = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userProfile);
    const listings = useSelector(state => state.user.listings);
    const designers = useSelector(state => state.user.designers)
    const userId = user.id;
    const [designer, setDesigner] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState('')
    const [priceBuy, setPriceBuy] = useState(null);
    const [priceRent, setPriceRent] = useState(null);
    const [priceRetail, setPriceRetail] = useState(null);
    const [size, setSize] = useState('')
    const [description, setDescription] = useState('');

    console.log('listings from sell component', listings)
    console.log("designers from Sell",designers)


    useEffect(() => {
        if(user) {
            dispatch(getListings(userId))
        }
    }, [dispatch])

    useEffect(() => {
        if(user) {
            dispatch(getDesigners(userId))
        }

    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            designer,
            category,
            photo,
            priceBuy,
            priceRent,
            priceRetail,
            description,
            size
        }
        //reset form values
    }


    return (
        <>
            <div className='sell-container'>
                <h2>Sell</h2>
                <form className='sell-form' onSubmit={handleSubmit}>
                    <select value={designer} onChange={(e) => setDesigner(e.target.value)}>
                        <option className='designer-drop' value=''>Designer </option>
                        {designers?.map(designer => (
                            <option className='designer-options' value={designer.name}>{designer.name}</option>
                        ))}
                    </select>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option className='category-drop' value=''>Category</option>
                        <option className='category-options' value='dress'>Dress</option>
                        <option className='category-options' value='sweater'>Sweater</option>
                        <option className='category-options' value='pants'>Pants</option>
                        <option className='category-options' value='t-shirt'>T-Shirt</option>
                        <option className='category-options' value='denim'>Denim</option>
                    </select>
                    <input className='sell-photo' placeholder='Photo'/>
                    <input className='sell-rent-price' placeholder='Rental Price' value={priceRent} onChange={(e) => setPriceRent(e.target.value)}/>
                    <input className='sell-buy-price' placeholder='Sale Price' value={priceBuy} onChange={(e) => setPriceBuy(e.target.value)}/>
                    <input className='sell-original-price' placeholder='Original Retail Price' value={priceRetail} onChange={(e) => setPriceRetail(e.target.value)}/>
                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                        <option className='sell-size-drop' value=''>Size</option>
                        <option className='sell-size-options' value='s'>Small</option>
                        <option className='sell-size-options' value='m'>Medium</option>
                        <option className='sell-size-options' value='l'>Large</option>
                    </select>
                    <textarea className='sell-description' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button type='submit'>Save</button>
                </form>

            </div>


            <h2>Listings</h2>
        </>
    )
}

export default Sell;
