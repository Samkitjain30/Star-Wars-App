import * as LoginConstants from '../constants/LoginConstants';

const assign = Object.assign || require('object.assign');


const initialState = {
    userData : {},
    isFetching : false,
    isFetched : false
};

// Takes care of changing the application state
export default function LoginReducer(state = initialState, action) {
     switch (action.type) {
        
        case LoginConstants.LOGIN_SUCCESS :
            return assign({}, state, {
                    userData: action.payload.results.length!==0 ? action.payload.results[0] : {},
                    isFetched : true,
                    isFetching : false
                });
            break;
        case LoginConstants.LOGIN_REQUEST :
            return assign({}, state, {
                    isFetching : true
                });
            break;
        case LoginConstants.LOGIN_FAILURE :
            return assign({}, state, {
                    isFetched : true,
                    isFetching : false,
                    userData : {}
                   
                });
            break;
            
        default:
            return state;
    }
}