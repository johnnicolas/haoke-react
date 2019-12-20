import {SET_OPEN_TYPE,SET_FILTER_DATA} from '../actionTypes/filterActionTypes'
//引入获取定位的城市的方法
import {getlocationCity} from '../../untils/city'
//导入axios
import axios from 'axios'


export const setOpenType = openType => {
    return{ type:SET_OPEN_TYPE,
        payload:{openType}
    }
}
//同步的方法
const setFilterData =  filterData =>{
    return{ type:SET_FILTER_DATA,
        payload:{filterData}
    }
}

//异步的方法
export const asyncSetFilterData = dispatch =>{
   return async dispatch=>{
       const {value} = await getlocationCity()
       const result = await axios.get(`/houses/condition?id=${value}`)
       //在触发同步的action将这个值传给他 然后他会到reducer里面进行处理
      dispatch(setFilterData(result.data.body))
   }
}