import React from 'react';



const ItemDetail = () => {

    return (
        <>
            <div className='item-detail-container'>
                <div className='item-detail-photo'>

                </div>
                <div className='item-info-container'>
                    <h2 className='item-designer'>Designer</h2>
                    <p className='item-retail'>{`Retail Price: `}</p>
                    <p className='item-description'>description.........</p>
                </div>
                <div className='item-rent-purchase-form'>
                    <form>
                        <select>
                            <option value= ''>Select</option>
                            <option value='s'>Small</option>
                        </select>
                    </form>
                </div>
            </div>

        </>
    )
}



export default ItemDetail;
