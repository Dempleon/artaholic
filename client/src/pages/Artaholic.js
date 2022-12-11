import React, { useState } from 'react';
import { LOGIN } from '../utils/mutations';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import Sell from '../pages/Sell';
import Cart from '../components/Cart/Cart';




function Artaholic() {
    const [currentPage, setCurrentPage] = useState('Home');

    const renderPage = () => {
        if(currentPage === 'Home') {
            return <Home/>;
        }
        if(currentPage === 'Gallery') {
            return <Gallery/>;
        }
        if(currentPage === 'Sell'){
            return <Sell />
        }
        return <Cart/>;
    };

    const handlePageChange = (page) => setCurrentPage(page);

    return(
        <div>
            <NavTabs currentPage={currentPage} handlePageChange={handlePageChange}/>
            {renderPage()}
        </div>
    );
}

export default Artaholic;