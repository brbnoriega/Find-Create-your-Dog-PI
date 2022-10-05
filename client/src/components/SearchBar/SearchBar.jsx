import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { getBreed, searchBreed } from '../../actions';
import styles from '../SearchBar/SearchBar.module.css';

export default function SearchBar({setReload, reload, setCurrentPage}){  

    const dispatch = useDispatch()

    //creo estado local: 
    const [nameDog, setName] = useState('')

    function handleReload(e){
        e.preventDefault(); // para que no se recargue la pag
        dispatch(getBreed());
        setReload({sort:"", breed: "", temperament:"all", weight:"", search:""})
        setCurrentPage(1)
    }
 

    function handleInputChange(e){ // setea el estaedo
        e.preventDefault();
        setName(e.target.value)
        setReload({search: e.target.value})
        
      }
      
    function handleSearch(search){
        if(search.charCode === 13){
            search.preventDefault();
            dispatch (searchBreed(search.target.value))//query
            setName(search.target.value)
            setReload({search: "", breed: "", temperament: "all"})  
            setTimeout(() => {
            setCurrentPage(1)
          }, 1000);        
        
        }}
      
    function handleInputSubmit(submit){
        submit.preventDefault();
        dispatch(searchBreed(nameDog)); 
        setReload({search: "", breed: "", temperament: "all"})
        setTimeout(() => {
            setCurrentPage(1)
          }, 1000);
        }

    return (  
        <div >
        <button className={styles.buttonRefresh} onClick= {e=> {handleReload(e)}}>↻</button>
      
        <input className={styles.search} 
        value={reload.search}
        type="search" 
        placeholder='Search a breed '
        // value={nameDog}                 
        onChange={(e)=>handleInputChange(e)}
        onKeyPress={(search)=>handleSearch(search)} 
                      
        />
        
        <button className={styles.buttonStyle} type='text' onClick={(submit) =>handleInputSubmit(submit)}>🔍</button>

        {/* ---------- form --------------*/}
        <Link to= '/dogs/'><button className={styles.buttonStyle}>🦴</button></Link> 
        </div>
)}


