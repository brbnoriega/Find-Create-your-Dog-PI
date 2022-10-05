import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import styles from '../Form/Form.module.css';
import {getTemperament, postTemp} from '../../actions';


export default function Create(){
    const dispatch = useDispatch()

    useEffect(()=>{  
        dispatch(getTemperament())
    },[dispatch]) 

    const firstTemp = useSelector((state)=> state.temperament)

    const [check, setCheck] = useState({ // le paso a este nuevo objeto lo  que necesita el post
            
        name: "",
        minAge: "",
        maxAge: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",// para que guarde mas que 1 opcion 
        maxWeight: "",
        img: "",
        temperament: []
        })
  
       const temperament = firstTemp.filter(f=>f.name !== '').sort(function(a,b){
        if(a.name > b.name){
            return 1;
        }
        if(b.name > a.name){
            return -1;
        }
        return 0;
    })


  const [error, setErr] = useState(true) 
    function validate(check){
    let keep = {};
    let regexImg = new RegExp ('^.*(jpg|gif|png|jpeg)$') // <-----IMG REDERIZADO
    //---------------------------NAME-----------------------------------
    let regexName = new RegExp('^[a-zA-Z ]{2,30}$'); 


   
               
    if(check.name.length>0 && !regexName.test(check.name))  keep.name = 'Pardon, that is not a name!';
                       
    //---------------------AGE-----------------------------------------
    if(check.minAge.length > 0)  { // si no hay nada pasa al siguiente 

    if (!(check.minAge*1 > 0 && check.minAge*1 < 26 && Number.isInteger(check.minAge*1))) keep.minAge = 'Try in a range of 1 to 25!';
     
    }          
    
   if(check.maxAge.length > 0 && check.minAge.length > 0 ){
     if(!(check.minAge*1 < check.maxAge*1 )) keep.tooMuch = 'The min age cant be more than max';
    }

    if(check.maxAge.length > 0)  {
    if(!(check.maxAge*1 > 0 && check.maxAge*1 < 26 && Number.isInteger(check.maxAge*1) )){
    keep.minAge = 'Try in a range of 1 to 25!'
    }
  }
    //-----------------HEIGHT---------------------------------------------
    if(check.minHeight.length > 0)  {
    if  (!(check.minHeight*1 > 0 && check.minHeight*1 < 201 && Number.isInteger(check.minHeight*1)))  keep.heighErr = 'Try a range betwenn 1 cm and 200 cm';
    }         
    if(check.minHeight.length > 0 && check.maxHeight.length > 0 ){            
    if(!(check.minHeight*1 < check.maxHeight*1 )) keep.heightMuch = 'The minimum height cant be more than max';
    }
    if(check.maxHeight.length > 0){
    if(!(check.maxHeight*1 > 0 && check.maxHeight*1 < 201 && Number.isInteger(check.maxHeight*1) ))keep.heighErr = 'Try a range betwenn 1 cm and 200 cm';
    }
    //-----------------WEIGHT---------------------------------------------
    if(check.minWeight.length > 0)  {
    if  (!(check.minWeight*1 > 0 && check.minWeight*1 < 301 && Number.isInteger(check.minWeight*1))) keep.weightErr = 'Try a range betwenn 1 kg and 300 kg';
    }                                          //xq me lo tomaba como text sino

    if(check.minWeight.length > 0 && check.maxWeight.length > 0 ){  
    if(!(check.minWeight*1 < check.maxWeight*1 )) keep.weightMuch = 'The minimum cant be more than max';

    }
    if(check.maxWeight.length > 0){
    if(!(check.maxWeight*1 > 0 && check.maxWeight*1 < 301 && Number.isInteger(check.maxWeight*1) ))  keep.weightErr = 'Try a range betwenn 1 kg and 300 kg';
  
    }
    //-----------------IMAGE---------------------------------------------
    if(check.img.length > 0){
      if (!check.img) { // SI NADIE ESCRIBIO NADA EN EL IMPUT 
    keep.img = '*Allowed: jpg-gif-png & jpeg'; 
  } else if (!regexImg.test(check.img)) { // SI ESCRIBIERON ALGO (chequea el formato)
    keep.img = '*Allowed: jpg-gif-png & jpeg'; // si no tiene ese formato agrega porpiedad con ese valor
  }
    }
    return keep
}

 //---manejo de cambios
 function handleChange(e){ 

    setErr(validate({ //validate
    ...check,
    [e.target.name]: e.target.value // [] braket notation --> entra a la prop del target, name varia.  y los : asigna el valor del value.
    //'Pardon, that is not a name!'

    }));

    setCheck({ //cambio de estados
    ...check,
    [e.target.name]: e.target.value
    })     

 }

 //traerme los temperaments
 function handleSelect(e){
    setCheck({
      ...check,
      temperament: [...new Set([...check.temperament, e.target.value])],
    })
   
  }

    function handleClean(e){
      setCheck({
      ...check,
      temperament: check.temperament.filter((tempFilter)=>tempFilter !== e.target.value), // seteo los distintos a los seleccionados
      })

    }

    function handleSubmit(e){
      e.preventDefault()
      if(check.name === '' || check.minAge  === '' || check.maxAge  === '' ||check.minHeight  === '' || check.maxHeight ===  '' || 
      check.minWeight === '' ||  check.maxWeight === '' || check.img === '' ||check.temperament.length === 0){
              alert('You have to field the form!')
      }else if(error.name || error.minAge || error.maxAge || error.minHeight || error.maxHeight || error.minWeight || error.maxWeight || error.img || error.temperament){ //chequeo que no haya errores
              alert('Please review the form!')
              
      }

      else{
      e.preventDefault();
      dispatch(postTemp(check)) // mando el estado con los campos
       
      alert("Your Breed is Create it!")
      setCheck({
        name: "",
        minAge: "",
        maxAge: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",// para que guarde mas que 1 opcion 
        maxWeight: "",
        img: "",
        temperament: []
      }) 
      setErr(true)
     e.target.temperament.value='';

    
}}


return(

  
    <div className={styles.background}>
<Link to= '/home'><button className={styles.backHome}>⟵</button></Link> 


<h3 className={styles.title}> Design your own Dog〰🖍 </h3>
        

<div className={styles.bigBox}>
<div className={styles.createDog}>
  <h3 className={styles.fontDog}>{check.name? check.name : "Name"}</h3>
  <img src="" alt="" />

<img className={styles.imgCreate }src={ check.img.length ? check.img : "https://i.imgflip.com/zomnd.jpg"   } ></img>
                      
<h3 className={styles.fontDog}> {check.temperament.length > 0 ? "Temperament: " +check.temperament.join(', ')  : "Every dog have a personality!"}</h3>
</div>

<form onSubmit={(e)=> handleSubmit(e)}>
  
<div className={styles.formBox}><br /><br /><br />

<div className={styles.gridName}> <label>Name</label>
        <input name="name" value={check.name} type="text" placeholder="Please write a name..." onChange={(e)=>handleChange(e)}/>
        </div>
       <span> {error.name && (<label className={styles.errorMens}>{error.name}</label>)} <br /></span> 
{/* ---------------------------------------------------------------------------------------------------------------------- */}
<div className={styles.inputStyles}>
<div className={styles.gridStyles}> <label>Age</label>
        <input name="minAge" type="number" value={check.minAge} placeholder="Min..." onChange={(e)=>handleChange(e)}/>
        <input name="maxAge" type="number" value={check.maxAge} placeholder="Max..." onChange={(e)=>handleChange(e)}/>
<div></div></div>

<span>{error.minAge && (<label className={styles.errorMens}>{error.minAge}</label>)}</span>
<span>{error.tooMuch && (<label className={styles.errorMens}>{error.tooMuch} </label>)}</span>
</div><br />
    
{/* ---------------------------------------------------------------------------------------------------------------------- */}
<div className={styles.inputStyles}>
        <div className={styles.gridStyles}><label>Height</label>
        <input name="minHeight" type="number" value={check.minHeight} placeholder="Min..." onChange={(e)=>handleChange(e)}/>
        <input name="maxHeight" type="number" value={check.maxHeight} placeholder="Max..." onChange={(e)=>handleChange(e)}/>
        <div></div> </div>
       <span>{error.heighErr && (<label className={styles.errorMens}>{error.heighErr}</label>)}</span> 
       <span>{error.heightMuch && (<label className={styles.errorMens}>{error.heightMuch}</label>)}</span>
</div><br />      
{/* ------------------------ ---------------------------------------------------------------------------------------------- */}
<div className={styles.inputStyles}>
       <div className={styles.gridStyles}><label>Weight</label>
        <input name="minWeight" type="number" value={check.minWeight}  placeholder="Min..." onChange={(e)=>handleChange(e)}/>
        <input name="maxWeight" type="number" value={check.maxWeight} placeholder="Max..." onChange={(e)=>handleChange(e)}/>

<div></div></div>
<span>{error.weightMuch && (<label className={styles.errorMens}>{error.weightMuch}</label>)}</span>
<span>{error.weightErr && (<label className={styles.errorMens}>{error.weightErr}</label>)}</span>
</div><br />
{/* ---------------------------------------------------------------------------------------------------------------------- */}
       <div className={styles.gridImg}> <label>Image</label>
        <input  type="text" name= 'img' value={check.img} placeholder= "Url..." onChange={(e)=>handleChange(e)}/>
     </div>
<span>{error.img && (<label className={styles.errorMens}> {error.img}</label>  )}</span><br />
          
{/* ---------------------------------------------------------------------------------------------------------------------- */}
        <div className={styles.gridTemp}>
        <label>Temperaments </label>
        <select name="temperament"  onChange={(e)=> handleSelect(e)}> 
              <option hidden value=''>Options...</option>

  { temperament.map(e => {return( <option value={e.name} key={e.id}>{e.name}</option>)})}
        </select><br />
         </div>
    <div>
      {check.temperament.map(tempMapeo=> {return (
        <>
        <button type="button" className={styles.crossButton} value={tempMapeo} onClick={(e)=> handleClean(e)}>x</button> <span>{tempMapeo}</span><br />
         </> 
        )})} </div> <br/>

{/* ---------------------------------------------------------------------------------------------------------------------- */}
{console.log(Object.keys(error).length)}
{Object.keys(error).length > 0  || check.name === '' || check.minAge  === '' || check.maxAge  === '' ||check.minHeight  === '' || check.maxHeight ===  '' || 
      check.minWeight === '' ||  check.maxWeight === '' || check.img === '' || check.temperament.length === 0 ? (
          <div >
            <button type="submit" disabled='true' className={styles.createbutton} >
              Create
            </button>
          </div>
        ) : (
          <div>
            <button type="submit" className={styles.createbuttonDos}> Create✅ </button>
          </div>
        )}
</div>
      
</form>
</div>
</div>
)} 
  