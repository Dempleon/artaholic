import React, { useState } from 'react';
import { LOGIN } from '../utils/mutations';




function Artaholic() {
    const [currentPage, setCurrentPage] = useState('Home');

    const renderPage = () => {
        if(currentPage === 'Home') {
            return <Home/>;
        }
        if(currentPage === 'Gallery') {
            return <Gallery/>;
        }
        if(currentPage === 'Login') {
            return <Login/>;
        }
        return <Cart/>; //cart-icon
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