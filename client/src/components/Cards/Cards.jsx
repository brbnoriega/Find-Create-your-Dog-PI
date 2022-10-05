import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../Cards/Cards.module.css';    


export default function Cards({name, id, minWeight, maxWeight, img,temperament}) { 
        return (
            <Link to= {'/dogs/'+ id} >
            <div className={styles.card}>

<h3 className={styles.fontCard}>{name}</h3>
<img className={styles.stylesImage} src={img} alt="" /> 
<h3 className={styles.fontCard}>Weigth:  {minWeight === null || maxWeight === null ? 'Without' : " "+ minWeight + " - " + maxWeight}</h3>
<h5 className={styles.fontTemperament}>Temperaments: <br />{temperament ? temperament.join(', ') : 'None'}</h5> 

            </div>
            </Link>
        )
    
    
    }