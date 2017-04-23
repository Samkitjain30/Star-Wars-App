import * as SearchPageConstants from '../constants/SearchPageConstants';

const assign = Object.assign || require('object.assign');


const initialState = {
    results : [],
    isFetching : false,
    isFetched : false
};

// Takes care of changing the application state
export default function SearchPageReducer(state = initialState, action) {
     console.log(action);
     switch (action.type) {

        case SearchPageConstants.PLANET_SEARCH_REQUEST :
            return assign({}, state, {
                    isFetching : true
                });
            break;
        case SearchPageConstants.PLANET_SEARCH_SUCCESS :
            return assign({}, state, {
                    results : action.payload.results,
                    isFetched : true,
                    isFetching : false
                });
            break;
        case SearchPageConstants.PLANET_SEARCH_FAILURE :
            return assign({}, state, {
                    isFetched : false,
                    isFetching : false,
                   
                });
            break;
            
        default:
            return state;
    }
}