import React from 'react';
import Styles from './container.module.css';
import cold from '../../images/cold.jpg';
import sun from '../../images/sun.jpg';
import cloud from '../../images/cloud.jpg';

function Container({ children, temperatura }) {
    function handleBackground() {
        if (typeof(temperatura) != 'number'){
            return cloud;
        }else if (temperatura >= 20) {
            return sun;
        } else {
            return cold;
        }
    }
    console.log(handleBackground())
    return (
        <div className={Styles.container} style={{background: `url(${handleBackground()}) center no-repeat`, backgroundSize: 'cover'}}>
            {children}
        </div>
    )
}

export default Container;