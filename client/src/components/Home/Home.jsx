import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getBreed, sortBreed, filterBreed, getTemperament, filterTemperament, sortWeigth, filterTen } from '../../actions';
import styles from '../Home/Home.module.css';
import Cards from '../Cards/Cards.jsx';
import Paginado from '../Paginado/Paginado.jsx';
import SearchBar from '../SearchBar/SearchBar';

export default function Home(){
    const dispatch = useDispatch();

    const allBreeds = useSelector(state=> state.breeds); 
    const temperament = useSelector(state => state.temperament) // viene del reducer []


    const[pag, setCurrentPage]= useState(1)// inicializacion
    const[breedsPerPage, setPerPage] = useState(8) //cant x pag 

    const [order, setOrder] = useState('');

    const max = Math.ceil(allBreeds.length / breedsPerPage); //max pag posible REDONDE HACIA ARRIBA 

    const sliceBreed = allBreeds.slice((pag - 1)* breedsPerPage,
    ((pag - 1) * breedsPerPage) + breedsPerPage )// corte de elementos x pag

//reload-----
const [reload, setReload] = useState({sort:"", breed: "", temperament:"all", weight:"", search:""})

    useEffect(()=>{
        dispatch(getBreed()) //cargo estado de redux
        },[dispatch])

        useEffect(()=>{
            dispatch(getTemperament())
            },[dispatch])

    //-----sort
       function handleSort(sort){ 
        sort.preventDefault()
        dispatch(sortBreed(sort.target.value))// se ejecuta y toma como payload el valor del click del usuario
        setOrder(`Order by abc : ${sort.target.value}`)  
        setReload({sort: sort.target.value})
   
      }    

      function handleSortWeigth(sorteandoWeigth){ 
        sorteandoWeigth.preventDefault()
        dispatch(sortWeigth(sorteandoWeigth.target.value))// se ejecuta y toma como payload el valor del click del usuario
        setOrder(`Order by abc : ${sorteandoWeigth.target.value}`)  
        setReload({sorteandoWeigth: sorteandoWeigth.target.value})
      }   
    //----filtrado breed-------
      function handleBreed(breedFilter) {
        breedFilter.preventDefault();
        dispatch(filterBreed(breedFilter.target.value));
        setOrder(`Order by breed : ${breedFilter.target.value}`)  
        setReload({breedFilter: breedFilter.target.value})
        setReload({temperament: 'all'})
        setCurrentPage(1)
     }
    //----filter temperamento------
    function handleTemperament(temp){
        temp.preventDefault();
        dispatch(filterTemperament(temp.target.value))
        setOrder(`Order by activities : ${temp.target.value}`)  
        setReload({temp: temp.target.value})
      setReload({breed: ''})
        setCurrentPage(1)
     }

     //filter ten test 
     function handlerFilterTest(filtrando){
     dispatch(filterTen(filtrando.target.value))

     }

return(

<div className={styles.background}>
 <SearchBar  
setReload={setReload} 
setCurrentPage={setCurrentPage} 
reload={reload}

 /> 

<div className={styles.align}>
  <div>
    <label className={styles.font} >Sort</label>
    <select className={styles.selectOrder} value={reload.sort} onChange={sort=>handleSort(sort)}>
    <option className={styles.selectOrder} hidden value=''>⇅</option>
    <option className={styles.selectOrder} value='az'>A-Z</option> 
    <option className={styles.selectOrder} value='za'>Z-A</option>
    </select>
</div>

<div>
    <label className={styles.font}>Breed</label>
    <select className={styles.selectOrder} value={reload.breed}  onChange={breedFilter=>handleBreed(breedFilter)}>
    <option className={styles.selectOrder} hidden value="">Options</option>
    <option className={styles.selectOrder} value='all'>All</option> 
    <option className={styles.selectOrder} value='existing'>Existing</option>
    <option className={styles.selectOrder} value='created'>Created</option>
    </select>

</div>

<div>
    <label className={styles.font}>Temperament</label>
    <select className={styles.selectOrder} value={reload.temperament} onChange={temp=>handleTemperament(temp)}>
    <option className={styles.selectOrder} value="all">All</option>
    <option className={styles.selectOrder} value="none">None</option>
    {temperament?.filter(f=>f.name !== '').sort(function(a,b){
        if(a.name > b.name){
            return 1;
        }
        if(b.name > a.name){
            return -1;
        }
        return 0;
    }).map(tempMap=>(<option className={styles.selectOrder} value={tempMap.name}>{tempMap.name}</option>) )}

  </select>
</div>


<div>
    <label className={styles.font}>Weight</label>
    <select className={styles.selectOrder} value={reload.weight} onChange={sortWeigth=>handleSortWeigth(sortWeigth)}>
        <option className={styles.selectOrder} hidden value="">⇅</option>
        <option className={styles.selectOrder} value='high'>high</option> 
        <option className={styles.selectOrder} value='low'>low</option>
     

    </select>
</div>
</div>


 {/* <button onClick={(filtrando)=>handlerFilterTest(filtrando)} value="ten">Filter</button>  menor a 10 */}

  <div className={styles.cardHome}>
{ sliceBreed < 1  ? 
  <div><iframe src="https://giphy.com/embed/SRwa9Th1hfSAfSqVfi" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/transparent-SRwa9Th1hfSAfSqVfi"></a></p></div>
       
: sliceBreed[0] ==='We dont have that Dog!' ?
    
<div><iframe src="https://giphy.com/embed/XdK9IKZnvCrO5sCndb" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/XdK9IKZnvCrO5sCndb"></a></p></div>
   
    : sliceBreed.map((breeds)=>{
            return (  
            <Cards
             key={breeds.id}
             id={breeds.id}
             name={breeds.name}
             minWeight={breeds.minWeight}
             maxWeight= {breeds.maxWeight}
             img={breeds.img}
             temperament={breeds.temperament}
             />)
        })} </div>
        

        <div className={styles.footer}>
          <div className={styles.boxFooter}>
     <Paginado 
                      pag={pag}
                      setCurrentPage={setCurrentPage} 
                      max={max}
                  />
  </div>
</div>

   </div> 
)

}
