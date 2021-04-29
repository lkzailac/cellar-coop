import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import {Link } from 'react-router-dom'

import { getItems } from '../../store/items';

// import '../../index.css';
import './Items.css';


const ItemsPage = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items);


    useEffect(() => {
        dispatch(getItems())
    },[dispatch])



    // const gotoDetail = async (itemId) => {
    //     <Redirect to={`/items/${itemId}`} />
    // }

    return (
        <>
            <div className='sorted'>
                <p>Sorted By: Most Recent</p>
            </div>
            <div className='sidebar'>
                <h2>Shop</h2>
                <ul>
                    <li>Dresses</li>
                    <li>Sweaters</li>
                    <li>T-Shirts</li>
                    <li>Pants</li>
                    <li>Denim</li>
                </ul>
            </div>
            <main>
                <div className='itemList'>

                    {items?.map((item) => (
                        <Link to={`/items/${item.id}`}>
                            <div key={item.id} className='itemList-item' >
                                <div className='image-container'>
                                    <img src={`${item.photo}`} alt={item.Category.name} />
                                </div>
                                <div className='itemList-item-info'>
                                    <p className='itemList-item-designer'>{item.Designer.name}</p>
                                    <p className='itemList-item-size'>{(item.sizeSInventory > 0 && item.sizeMInventory > 0 && item.sizeLInventory > 0) ? <>Multiple Sizes</> : <>one size available</>}</p>
                                    <p className='itemList-item-price'>{`rent for $${item.priceToRent_USD}`}</p>
                                </div>

                            </div>
                        </Link>
                    ))}


                </div>
            </main>



        </>


    )
}



// onClick={() => window.location.href=}


export default ItemsPage;
