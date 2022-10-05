import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../Landing/Landing.module.css';

export default function LandingPage(){
    return(
        
 
         <div className={styles.background}>
      
            <h1 className={styles.title}>Doggy time!</h1>
       

            <Link to= '/home'>
      
            <button className={styles.button}><h3 ><span>Try it </span></h3></button>
       
            
            </Link> 
  </div>
    )
}
