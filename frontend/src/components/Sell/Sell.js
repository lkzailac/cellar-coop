import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';




import { getListings, getDesigners } from '../../store/user';


const Sell = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userProfile);
    const listings = useSelector(state => state.user.listings);
    const designers = useSelector(state => state.user.designers)
    const userId = user.id;
    const [designer, setDesigner] = useState('')

    console.log('listings from sell component', listings)
    console.log("designers from Sell",designers)


    useEffect(() => {
        if(user) {
            dispatch(getListings(userId))
        }
    }, [dispatch])

    useEffect(() => {
        if(user) {
            console.log("HOAHFNOANFPAISFn")
            dispatch(getDesigners(userId))
        }

    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

    }


    return (
        <>
            <div className='sell-container'>
                <h2>Sell</h2>
                <form onSubmit={handleSubmit}>
                    <select value={designer} onChange={(e) => setDesigner(e.target.value)}>
                        <option disabled>Designer v</option>
                        {designers.map(designer => (
                            <option value={designer.name}>{designer.name}</option>
                        ))}
                    </select>
                    <button type='submit'>List</button>
                </form>

            </div>


            <h2>Listings</h2>
        </>
    )
}

export default Sell;
