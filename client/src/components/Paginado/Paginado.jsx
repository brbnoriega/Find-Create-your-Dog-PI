import React from "react";
import styles from '../Paginado/Paginado.module.css';


export default function Paginado ({pag, setCurrentPage, max}){ //le paso las props/paramentros/estados
  const arreglito = []

for(let i= 1; i <= max; i++){
    arreglito.push(i)

}
console.log(arreglito)

    const nextPage = () => {
        if (pag !== max ) return setCurrentPage(pag + 1);
    }; 

    const prevPage = ()=>{
     if(pag !== 1)  return setCurrentPage(pag - 1);
    }

 function handleClick(click){
    click.preventDefault();
    setCurrentPage(Number(click.target.value))
 }
    return(

            <div >
                <button  className={styles.arrow} onClick={prevPage}>&#8249;</button>
                {arreglito? arreglito.map(m=> (<button className={m === pag ? styles.pagActual : styles.pagOther} value={m} onClick={(click)=>handleClick(click)}>{m}</button>)) : 'not array'}
                {/* <span> {pag}  - {max}</span> */}

                {}
                <button className={styles.arrow}  onClick={nextPage}>&#8250;</button>
            </div>
    )
}

