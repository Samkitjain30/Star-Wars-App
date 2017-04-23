import * as LoginConstants from '../constants/LoginConstants';

import AppService from '../AppServices/AjaxService';


const  doLogin = (url)=> {
	return (dispatch) => {
		dispatch(loginRequest());
		
		function callback(success, err){
			
			if (success) {
				dispatch(loginSuccess(success));
				
			}
			else{
				dispatch(loginFailure(err));
			}
		};
		var reqUrl = url;
		AppService.getData(reqUrl,callback);

	}
}


const loginSuccess = (newState)=> {
  	return { type: LoginConstants.LOGIN_SUCCESS, payload : newState  };
}
const loginRequest = ()=> {
  	return { type: LoginConstants.LOGIN_REQUEST};
}
const loginFailure = (error)=>{
  	return { type: LoginConstants.LOGIN_FAILURE};
}


export {
	doLogin
}