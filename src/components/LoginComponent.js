import React, { Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../actions/LoginActions';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import HeaderComponent from './HeaderComponent';
import LoaderComponent from './LoaderComponent';

class LoginComponent extends Component {
	constructor(props){
		super(props);
		this.onClickLoginBtn = this.onClickLoginBtn.bind(this);
		this.state={
			showLoginFailureTxt : false
		}

	}
	componentWillMount(){
		var authObj= localStorage.getItem('starwarApp');
		var userInfo={}
		if(authObj){
			userInfo =JSON.parse(authObj);
			this.goToSearchPage(userInfo.username);
		}

	}
	onClickLoginBtn(){
		var username = this.refs.username.value;
		var password = this.refs.password.value;
		this.setState({
			showLoginFailureTxt : false
		})
		var urlForPeopleSearch = 'http://swapi.co/api/people?search=' + username;
		this.props.dispatch(actions.doLogin(urlForPeopleSearch));
	}
	goToSearchPage(username){
		browserHistory.push({
			pathname : '/starwars/' + username
		})
	}
	componentWillReceiveProps(nextProps){
		var userData =  nextProps.data.userData;
		var isFetched = nextProps.data.isFetched;
		var isFetching = nextProps.data.isFetching;
		var isValidEnteries = (userData && userData.name== this.refs.username.value && userData['birth_year']==this.refs.password.value);
		if(isFetched && !isFetching){
			if(isValidEnteries){
				var authObject = {
					username : userData.name,
				}
				localStorage.setItem('starwarApp',JSON.stringify(authObject));
				this.goToSearchPage(userData.name);

			//alert('user valid login');
			}
			else if(!isValidEnteries){
				this.setState({
					showLoginFailureTxt : true
				})
				
			}	
		}
		
	}
	
	render(){
		return (
	    <div>
	    <HeaderComponent  showLogout={false}/>
	    <div className='login-container'>
	      	
	 		<span className='color-white welcome-tag'>Welcome Warrior. Please Login !!!</span>
	 		<div className='login-input'>
	 			<div className='input-box'>
	 			  <span>Name :</span>
	 			  <input ref='username' placeholder="warrior's name"/>
	 			</div>
	 			<div className='input-box'>
	 			  <span>Password :</span>
	 			  <input ref='password' placeholder="password" type='password'/>
	 			</div>
	 			<button onClick={this.onClickLoginBtn} className='login-btn'>Log In</button>
	 			
	 		</div>
	 		{this.props.data.isFetching && <LoaderComponent />}
	 		 {this.state.showLoginFailureTxt && <div className="exceed-error-tag">Login Failed .Please Check username and password</div>}
	    </div>
	   
	    </div>
	  );
	}

}

function select(state) {
	return {
		data: state.LoginReducer
	};
}


export default connect(select)(LoginComponent);
