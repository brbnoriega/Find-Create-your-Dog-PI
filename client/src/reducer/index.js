import { GET_BREED, SEARCH_BREED, SORT_BREED, FILTER_BREED, FILTER_TEMPERAMENT, GET_TEMPERAMENT, SORT_WEIGTH, GET_DETAIL, CLEAN_DETAIL, GET_TEN } from "../actions";

const initialState = {

breeds: [], // LISTA QUE MANIPULO 
allBreeds: [], //LISTA SIEMPRE COMPLETA 
temperament: [], //[""]
detail: [],

}

function rootReducer(state = initialState, action){
    switch(action.type){
        
        case GET_BREED:
        return{
            ...state,
            breeds: action.payload,
            allBreeds: action.payload
        }

        case GET_TEMPERAMENT:
            return{
                ...state,
                temperament: action.payload
            }
        case GET_DETAIL:{
            return{
                ...state,
                detail: action.payload
                }
            }
        case SEARCH_BREED:
            return{
            ...state,
            breeds: action.payload // arreglo que estoy renderizando
            }

        case SORT_BREED:
            
                const sortBreed = state.breeds
                const sortByName = action.payload === 'za' ? sortBreed.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0
            }): sortBreed.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name> a.name){
                    return -1;
                }
                return 0;
            })
            return{
                ...state,
                breeds: sortByName
            }

        case SORT_WEIGTH:

        const weigthSort = state.breeds 
        const sortito = action.payload === 'low' ? 
        //primero se ordena el minimo y luego se ordena el maximo
        weigthSort.sort(function (a, b) {   return a.minWeight - b.minWeight || a.maxWeight - b.maxWeight}) : // - a +
                                                            //+ a -
        weigthSort.sort(function (a, b) {   return b.minWeight - a.minWeight || b.maxWeight - a.maxWeight})

        console.log(action.payload)
        console.log(sortito)
           
        return{
            ...state,
            breeds: sortito
        }

        case FILTER_BREED:
            
            const logicFilter =  action.payload === 'all'  ? state.allBreeds :
             action.payload === 'existing' ? state.allBreeds.filter(f=> f.createBy === 'api') 
             : state.allBreeds.filter(f=> f.createBy === 'database')
      
             
        return{
                ...state,
                breeds: logicFilter
            }     
        case FILTER_TEMPERAMENT:
        const stateAll = state.allBreeds                                                       
        const temperamentFilt = action.payload === 'all' ? stateAll : action.payload === 'none' ? stateAll.filter(f=>f.temperament === undefined) : stateAll.filter(f=>f.temperament 
            && f.temperament.filter(f=>f === action.payload).length)

        return{
                ...state,
                breeds: temperamentFilt
            }

        case GET_TEN:
            const stateDoggFilter = state.breeds
            const filterTen = action.payload === "ten" ? stateDoggFilter.filter(filter=>filter.minWeight < 10) : "Not Found"

            return{
                ...state,
                breeds: filterTen
            }

        case CLEAN_DETAIL:{
            return{
                ...state,
                detail: action.payload
            }
        }

        default:
        return state;
    }}

export default rootReducer;