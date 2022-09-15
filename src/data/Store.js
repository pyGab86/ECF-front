import { createStore } from 'redux';


const initialState = {
    user: null
};

const symbolReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'user':
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
};

const Store = createStore(symbolReducer);

export default Store;