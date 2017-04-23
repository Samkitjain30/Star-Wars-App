
import * as SearchPageConstants from '../constants/SearchPageConstants';

import AppService from '../AppServices/AjaxService';


const  searchPlanets = (url)=> {
	
	return (dispatch) => {
		dispatch(searchPlanetRequest());
		

		 function callback(success, err){
			
			if (success) {
				dispatch(searchPlanetSuccess(success));
				
			}
			else{
				dispatch(searchPlanetFailure(err));
			}
		};
		var reqUrl = url;
		AppService.getData(reqUrl,callback);

	}
}


const searchPlanetSuccess = (newState)=> {
  	return { type: SearchPageConstants.PLANET_SEARCH_SUCCESS, payload : newState  };
}
const searchPlanetRequest = ()=> {
  	return { type: SearchPageConstants.PLANET_SEARCH_REQUEST};
}
const searchPlanetFailure = (error)=>{
  	return { type: SearchPageConstants.PLANET_SEARCH_FAILURE};
}


export {
	searchPlanets
}