import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getItems } from '../../store/items';

// import '../../index.css';
import './Items.css';


const ItemsPage = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items);

    console.log('items from front end', items);

    useEffect(() => {
        dispatch(getItems())
    },[dispatch])


    let sizeInfo;
    const getSize = () => {


        items?.map((item) => {
            if(item.sizeSInventory > 0 && item.sizeMInventory > 0 && item.sizeLInventory > 0) {
                sizeInfo = (
                    <>Multiple Sizes</>
                )
            } else if (
                (item.sizeSInventory === 0 && item.sizeMInventory === 0 && item.sizeLInventory > 0)
                || (item.sizeSInventory === 0 && item.sizeMInventory > 0 && item.sizeLInventory === 0)
                || (item.sizeSInventory > 0 && item.sizeMInventory === 0 && item.sizeLInventory === 0)
                ) {
                sizeInfo =(
                    <>one size available</>
                )
            }
        })
    }

    console.log('size', getSize())

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
                        <div key={item.id} className='itemList-item'>
                            <div className='image-container'>
                                <img src={`${item.photo}`} alt={item.Category.name} />
                            </div>
                            <div className='itemList-item-info'>
                                <p className='itemList-item-designer'>{item.Designer.name}</p>
                                <p className='itemList-item-size'>{sizeInfo}</p>
                                <p className='itemList-item-price'>{`rent for $${item.priceToRent_USD}`}</p>
                            </div>

                        </div>
                    ))}


                </div>
            </main>



        </>


    )
}






export default ItemsPage;
