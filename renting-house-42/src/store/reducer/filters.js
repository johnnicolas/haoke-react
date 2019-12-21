import {
    SET_OPEN_TYPE,
    SET_FILTER_DATA,
    SET_SELECT_VALUE,
    SELECT_TITLE_VALUE
} from '../actionTypes/filterActionTypes'

const initState = {
    openType: '',
    //将filterdata传过来为空对象
    filterData: {},
    selectValue: { //这是我们选中的值
        area: [
            'area',
            'null'
        ],
        mode: [
            'null'
        ],
        price: [
            'null'
        ],
        more: []
    },
    //这个是标题选中时候的值,如果为true则高亮,不为true不高亮
    selecTitleValue: {
        area: false,
        mode: false,
        price: false,
        more: false
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case SET_OPEN_TYPE:
            //把之前的数据,进行深拷贝
            const newState1 = JSON.parse(JSON.stringify(state))
            return {
                ...newState1, ...action.payload
            }
            case SET_FILTER_DATA:
                const newState2 = JSON.parse(JSON.stringify(state))
                return {
                    ...newState2, ...action.payload
                }
                case SET_SELECT_VALUE:
                    const newState3 = JSON.parse(JSON.stringify(state))
                    //这里是用传过来的值将selectvalue里面的值同名的给覆盖掉
                    newState3.selectValue = {
                        ...newState3.selectValue,
                        ...action.payload
                    }
                    //点击确定之后关掉filterpicker或者filtermore那么就将这个传过来的里面的opentype设置为‘’
                    newState3.openType = ''
                    return newState3
                case SELECT_TITLE_VALUE:
                    //还是将之前的数据进行深拷贝
                    const newState4 = JSON.parse(JSON.stringify(state))
                    newState4.selecTitleValue = {
                        ...newState4.selecTitleValue,
                        ...action.payload
                    }
                    
                    return newState4
                default:
                    return state;
    }
}