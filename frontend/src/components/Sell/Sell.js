import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getListings, getDesigners } from '../../store/user';
import {listItem} from '../../store/items';
import {deleteListing} from '../../store/user';

import './Sell.css'

const Sell = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userProfile);
    const listings = useSelector(state => state.user.listings);
    const designers = useSelector(state => state.user.designers)
    const userId = user.id;
    const [designerId, setDesignerId] = useState(null);
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState(null)
    const [priceToBuy_USD, setPriceToBuy_USD] = useState(null);
    const [priceToRent_USD, setPriceToRent_USD] = useState(null);
    const [originalPrice_USD, setOriginalPrice_USD] = useState(null);
    const [size, setSize] = useState('')
    const [description, setDescription] = useState('');



    //get listings
    useEffect(() => {
        if(user) {
            dispatch(getListings(userId))
        }
    }, [dispatch])

    //get designers for dropdown
    useEffect(() => {
        if(user) {
            dispatch(getDesigners(userId))
        }

    }, [dispatch])

    //list new item
    const handleSubmit = async (e) => {
        e.preventDefault();

        let sizeSInventory;
        let sizeMInventory;
        let sizeLInventory;
        if(size === 's') {
            sizeSInventory = 1;
            sizeMInventory = 0;
            sizeLInventory = 0;
        }
        if(size === 'm') {
            sizeSInventory = 0;
            sizeMInventory = 1;
            sizeLInventory = 0;
        }
        if(size === 'l') {
            sizeSInventory = 0;
            sizeMInventory = 0;
            sizeLInventory = 1;
        }

        const listingItem = {
            userId,
            photo,
            description,
            originalPrice_USD,
            priceToRent_USD,
            priceToBuy_USD,
            sizeSInventory,
            sizeMInventory,
            sizeLInventory,
            designerId,
            category,
        };

        const newItem = await dispatch(listItem(listingItem));
        console.log('new item', newItem)

        //if successful reset form values
        if(newItem) {
            setDesignerId(null)
            setCategory('')
            setPhoto(null)
            setPriceToBuy_USD(null)
            setPriceToRent_USD(null)
            setOriginalPrice_USD(null)
            setSize('')
            setDescription('')
        }
    }

    //update photo
    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setPhoto(file);
    };



    const deleteSell = async (listingId) => {

        if(listingId) {
            dispatch(deleteListing(listingId));
        }
    }



    return (
        <>
            <div className='sell-container'>
                <h2>Sell</h2>
                <form className='sell-form' onSubmit={handleSubmit}>
                    <select value={designerId} onChange={(e) => setDesignerId(e.target.value)}>
                        <option className='designer-drop' value=''>Designer </option>
                        {designers?.map(designer => (
                            <option className='designer-options' value={designer.id}>{designer.name}</option>
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
                    <input className='sell-photo' placeholder='Photo' type='file' onChange={updateFile}/>
                    <input className='sell-rent-price' placeholder='Rental Price' value={priceToRent_USD} onChange={(e) => setPriceToRent_USD(e.target.value)}/>
                    <input className='sell-buy-price' placeholder='Sale Price' value={priceToBuy_USD} onChange={(e) => setPriceToBuy_USD(e.target.value)}/>
                    <input className='sell-original-price' placeholder='Original Retail Price' value={originalPrice_USD} onChange={(e) => setOriginalPrice_USD(e.target.value)}/>
                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                        <option className='sell-size-drop' value=''>Size</option>
                        <option className='sell-size-options' value='s'>Small</option>
                        <option className='sell-size-options' value='m'>Medium</option>
                        <option className='sell-size-options' value='l'>Large</option>
                    </select>
                    <textarea className='sell-description' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button type='submit' >Save</button>
                </form>

            </div>

            <div className='listing-container'>
                <h2>Listings</h2>
                <div className='listing-items'>
                    {listings?.map((listing) => (
                        <>
                            <img key={listing.id} src={listing.Item.photo}/>
                            <p className='listing-designer'>{listing.Item.Designer.name}</p>
                            <div className='listing-prices'>
                                <p>{`rent for $${listing.Item.priceToRent_USD}`}</p>
                                <p>{`buy for $${listing.Item.priceToBuy_USD}`}</p>
                            </div>
                            <p className='listing-size'>size
                                {listing.Item.sizeLInventory > 0 ? <> L</> : <></>}
                                {listing.Item.sizeMInventory > 0 ? <> M</> : <></>}
                                {listing.Item.sizeSInventory > 0 ? <> S</> : <></>}
                            </p>
                            <button className='listing-unlist' type='button' value ={listing.id}onClick={(e) => deleteSell(e.target.value)}>Unlist</button>
                        </>
                    ))}

                </div>
            </div>



        </>
    )
}

export default Sell;
