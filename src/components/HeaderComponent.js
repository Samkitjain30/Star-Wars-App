import React, { Component} from 'react';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';

class HeaderComponent extends Component {
	constructor(props){
		super(props);
		this.logOut = this.logOut.bind(this);
	}

	logOut(){
		delete localStorage.starwarApp;
		this.goToLoginPage();
	}
	goToLoginPage(){
		browserHistory.push({
			pathname : '/starwarslogin'
		})
	}
	shortenName(name){
		var newName =name;
		if(name.length>6){
			var nameArr=name.split('');
			nameArr.splice(6);
			newName = nameArr.join('')+'...';

		}
		return newName;
	}
	render(){
		return (
	    
	      <div className='app-header'>
	      	<span className='starwars-icon'></span>
	      	<span className='app-heading'>Star Wars Warriors </span>
	      	{this.props.showLogout && <span title={this.props.loggedInUser} className='head-loggedInName'>LoggedIn user:<span>{this.shortenName(this.props.loggedInUser)}</span></span>}
	      	{this.props.showLogout && <span className='float-right logout-span' onClick={this.logOut}>Log out</span>}
	      </div>
	     
	  );
	    }
	

}
export default HeaderComponent;
