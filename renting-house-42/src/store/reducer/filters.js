import {SET_OPEN_TYPE,SET_FILTER_DATA} from  '../actionTypes/filterActionTypes'

const initState = {
    openType:'',
    //将filterdata传过来为空对象
    filterData:{}
}

export default (state = initState,action)=>{
     switch (action.type) {
         case SET_OPEN_TYPE:
             //把之前的数据,进行深拷贝
             const newState1 = JSON.parse(JSON.stringify(state))
           return {...newState1,...action.payload}
          case SET_FILTER_DATA:
              const newState2 = JSON.parse(JSON.stringify(state))
          return {...newState2,...action.payload}

         default:
             return state;
     }
}