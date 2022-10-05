import React from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail, cleanDetail, deleteTemp, putTemp } from "../../actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from '../Detail/Detail.module.css';


export default function Detail(){

    const {id} = useParams()
    const dispatch = useDispatch()

    const detailDog = useSelector((state)=> state.detail) // entro y me traigo el detalle

    useEffect(()=>{
        dispatch(getDetail(id))// accedo al id del detalle

        return()=>{dispatch(cleanDetail([])); // despacha la accion de clean y retorna un array vacio
        } 
        },[dispatch]) // muestra recien cuando el componente se monta

  
    return(

        <div className={styles.background}><br />
       
            { Object.keys(detailDog).length > 0 ? 
            
        <div className={styles.boxCard}>
            <div className={styles.buttonsDiv}>
            <Link to= '/home'><button className={styles.backHome}>⟵</button></Link>
            <Link to= '/dogs/'><button className={styles.buttonStyle}>🦴</button></Link>
            </div> 
          
        <h3 className={styles.fontName}>{detailDog.name} </h3>
        <img className={styles.imgCard} src={detailDog.img} alt={detailDog.name} /> 
        <h3 className={styles.font}>Age between: {`${detailDog.minAge? detailDog.minAge : ""} - ${detailDog.maxAge ? detailDog.maxAge : "" } years`}</h3>
        <h3 className={styles.font}>Weight: {`${detailDog.minWeight? detailDog.minWeight : ""} - ${detailDog.maxWeight ?detailDog.maxWeight : "" } kg `}</h3>
        <h3 className={styles.font}>Height: {`${detailDog.minHeight ? detailDog.minHeight : ""} - ${detailDog.maxHeight ? detailDog.maxHeight : ""} cm`}</h3>
        <h3 className={styles.font}>Temperament: <br />{detailDog.temperament? detailDog.temperament.join(', ') : 'None'}</h3>
        

        </div>: <div><iframe src="https://giphy.com/embed/SRwa9Th1hfSAfSqVfi" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/transparent-SRwa9Th1hfSAfSqVfi"></a></p></div> }
        </div>
    )}
