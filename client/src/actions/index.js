import axios from 'axios';
export const GET_BREED = 'GET_BREED';
export const SEARCH_BREED = 'SEARCH_BREED';
export const SORT_BREED = 'SORT_BREED';
export const FILTER_BREED = 'FILTER_BREED';
export const FILTER_TEMPERAMENT = 'FILTER_TEMPERAMENT';
export const GET_TEMPERAMENT ='GET_TEMPERAMENT';
export const SORT_WEIGTH = 'SORT_WEIGTH';
export const GET_DETAIL= 'GET_DETAIL';
export const CLEAN_DETAIL= 'CLEAN_DETAIL';
export const GET_TEN="GET_TEN";

export function getBreed(){
    return async function(dispatch){ 
        try{
             var getBreedApi = await axios.get('/dogs')
                console.log(getBreedApi.data)
             return dispatch({
                    type: GET_BREED,
                    payload: getBreedApi.data
             })  }catch(error){
            return error;
            }}}


    
export function getTemperament(){
    return async function(dispatch){
    try{
        var getTemp = await axios.get('/temperaments')
        return dispatch({
            type: GET_TEMPERAMENT,
            payload: getTemp.data
        })
    }catch(error){
    return error;
}}}


export function getDetail(id){
    return async function(dispatch){
    try{
        var getId = await axios.get('/dogs/' + id);
        return dispatch({
            type: GET_DETAIL,
            payload: getId.data
        })
    }catch(error){
return error;
}}}




export function searchBreed(name){
    return async function(dispatch){
        try{
            var json = await axios(`/dogs?name=${name}`)   
            console.log(json.data)
            return dispatch({
                type: SEARCH_BREED,
                payload: json.data 
            });
        
            }catch(error){
                    throw alert('BREED Not Found!')
            }}}
 
//-----sort----------------------------------------------
   export function sortBreed(payload){
    return{
        type: SORT_BREED,
       payload
    }
}    

export function sortWeigth(payload){
    return{
        type: SORT_WEIGTH,
       payload
    }
} 

//-----filter breed----------------------------------------------
export function filterBreed(payload){
    return{
        type: FILTER_BREED,
       payload
    }
}    

//-----filter temperament----------------------------------------------
export function filterTemperament(payload){
    return{
        type: FILTER_TEMPERAMENT,
       payload
    }
}    

//postTemp para el form:
export function postTemp(payload){
    return async function (){
        var response = await axios.post('/dogs/', payload) //lo que me llega al front
        return response;
    };
    }

//-----cleanDetail----
export function cleanDetail (payload){
    return{
        type: CLEAN_DETAIL,
        payload
    }
}
//----
export function filterTen(payload){
return{
    type:GET_TEN,
    payload
}
}
