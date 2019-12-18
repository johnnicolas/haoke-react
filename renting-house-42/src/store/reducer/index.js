import {combineReducers} from 'redux'  //相当于vuex中的module

//导入各个子reducer
import filters from './filters'

export default combineReducers({
    filters
})