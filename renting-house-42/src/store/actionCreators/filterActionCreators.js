import {SET_OPEN_TYPE} from '../actionTypes/filterActionTypes'

export const setOpenType = openType => {
    return{ type:SET_OPEN_TYPE,
        payload:{openType}}
   
}