import SET_OPEN_TYPE from '../actionTypes/filterActionTypes'

const initState = {
    openType:''
}

export default (state = initState,action)=>{
     switch (action.type) {
         case SET_OPEN_TYPE:
             
           return {}
     
         default:
             return state;
     }
}