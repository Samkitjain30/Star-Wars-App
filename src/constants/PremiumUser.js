'use strict';
const PremiumUser =[
	{'name' : 'Luke Skywalker'}
]
const requestCap = 3;
const timeCap = 10000; //in milli seconds
const isExist = (userName) => {
	// PremiumUser.forEach((element,index,array) => {

	// })
	for(var index=0 ; index<PremiumUser.length;index++){
		var userObjName = PremiumUser[index].name;
		if(userObjName==userName){
			return true;
		}
	}
	return false;
}

export {
	isExist,
	requestCap,
	timeCap
}
