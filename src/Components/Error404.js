import React from 'react';
import '../Styles/Error404.css';
import { Link } from 'react-router-dom';
import Error from '../img/Error404.png';
const Error404 = () => {
    return ( 
        <div className='error'>
            <img src={Error} alt=""/>
            <Link to='/' className='return404'>Return</Link>
        </div>
     );
}
 
export default Error404;