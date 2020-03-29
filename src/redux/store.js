import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'
const initialForm = {
    name: '',
    weight: 0,
    img: ''
}
export const bearActions = {
    getBearsSuccess: bears => ({
        type: 'GET_BEARS_SUCCESS', bears
    }),
    getBearsFailed: () => ({ type: 'GET_BEARS_FAILED' }),
    getBears: () => async (dispatch) => {
        try {
            console.log('get bear new')
            const response = await axios.get(`http://localhost:3000/api/bears`)
            const responseBody = await response.data;
            console.log('response: ', responseBody)
            dispatch({ type: 'GET_BEARS_SUCCESS', bears: responseBody });
        } catch (error) {
            console.error(error);
        }
    },
    addBear: (bears, form) => ({
        type: 'ADD_BEAR', bears: {
            id: bears.length > 0 ? bears[bears.length - 1].id + 1 : 0,
            ...form
        }
    }),
    deleteBear: (id) => ({ type: 'DELETE_BEAR', id: id }),
    updateBear: (id, form) => ({ type: 'UPDATE_BEAR', id: id, bear: { ...form, id: id } })
}


export const formActions = {
    changeName: (name) => ({ type: 'CHANGE_NAME', name: name }),
    changeWeight: (weight) => ({ type: 'CHANGE_WEIGHT', weight: weight }),
    changeImg: (img) => ({ type: 'CHANGE_IMG', img: img })
}

const bearReducer = (bears = [], action) => {
    switch (action.type) {
        case 'GET_BEAR':
            return action.bears
        case 'ADD_BEAR':
            return [...bears, action.bears]
        case 'DELETE_BEAR':
            return bears.filter((bear) => +bear.id !== +action.id)
        case 'UPDATE_BEAR':
            return bears.map((bear, index) => {
                if (+bear.id === +action.id) {
                    return action.bear;
                }
                else {
                    return bear;
                }
            })
        case 'GET_BEARS_SUCCESS':
            console.log('action: ', action.bears)
            return action.bears
        case 'GET_BEARS_FAILED':
            console.log('action: Failed')
            return action.bears

    }
    return bears;
}
const formReducer = (data = initialForm, action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...data,
                name: action.name
            }
        case 'CHANGE_WEIGHT':
            return {
                ...data,
                weight: action.weight
            }
        case 'CHANGE_IMG':
            return {
                ...data,
                img: action.img
            }
        default: return data;
    }
}
const reducers = combineReducers({
    bear: bearReducer,
    form: formReducer
})

export const store = createStore(reducers, applyMiddleware(logger, thunk));