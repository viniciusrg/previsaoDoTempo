import React from 'react';
import Styles from './exibirTemperatura.module.css';

function Exibirtemperatura({ children }) {
    return (
        <div className={Styles.box} >
            {children}
        </div>
    )
}

export default Exibirtemperatura;