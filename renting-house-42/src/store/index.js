import {createStore,applyMiddleware,compose} from 'redux'

//导入reducer 
import rootReducer from './reducer'

//导入 异步的 redux-thunk 
import thunk from 'redux-thunk'

//创建仓库并且导出
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store =createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

export default store 