import React, { Component} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getData} from '../AppServices/AjaxService';
import LoaderComponent from './LoaderComponent';
import HeaderComponent from './HeaderComponent';
import { browserHistory } from 'react-router';
import * as actions from '../actions/SearchPageActions';
import {timeCap,requestCap,isExist} from '../constants/PremiumUser';

class SearchPage extends Component {
	constructor(props){
		super(props);
		this.onChangeSearchbox = this.onChangeSearchbox.bind(this);
		this.createHtmlForResult = this.createHtmlForResult.bind(this);
		this.getCssObject = this.getCssObject.bind(this);
		this.state = {
			results : [],
			maxPopulation : 0,
			noOfRequest : 0,
			sessionStartTime : '',
			showUserExceededTxt : false
		}
		
	}
	componentDidMount(){
		
	}
	componentWillReceiveProps(nextProps){
		var maxPopulation = 0;
		var minPopulation = 0;
		var results = nextProps.data.results;
		for(var index=0;index<results.length;index++){
			var parsedPopulation = parseInt(results[index].population);
			
			if(!isNaN(parsedPopulation)){
				minPopulation = minPopulation < parsedPopulation ? minPopulation : parsedPopulation;
				maxPopulation = maxPopulation < parsedPopulation	? parsedPopulation : maxPopulation;
				
			}
			
		}
		this.setState({
			results : nextProps.data.results,
			maxPopulation : maxPopulation,
			minPopulation : minPopulation
		})
	}
	goToLoginPage(){
		browserHistory.push({
			pathname : '/starwarslogin'
		})
	}
	componentWillMount(){

		if(!localStorage.getItem('starwarApp')){
			this.goToLoginPage();
		}
		var currentTime = new Date();
		this.setState({
			sessionStartTime : currentTime
		})
	}
	onChangeSearchbox(){
		var planetName= this.refs['planet-name'].value;
		var currentTime = new Date();
		console.log('currentTime',currentTime.toGMTString());
		console.log('sessionStartTime',this.state.sessionStartTime.toGMTString());
		var currentTime = new Date();
		if(currentTime - this.state.sessionStartTime>timeCap){
			
			this.setState({
				noOfRequest : 0,
				sessionStartTime : currentTime
			})
		}

		if(planetName==''){
			return ;
		}
		
		var userName = this.props.routeParams.username;
		
		if(!isExist(userName)){
			var currNoOfRequest = this.state.noOfRequest;
			var newNoOfRequest = currNoOfRequest + 1;
			
			if(newNoOfRequest > requestCap){
				this.setState({
					showUserExceededTxt : true
				})
				return;
			}
			if(newNoOfRequest <= requestCap){
				this.setState({
					noOfRequest : newNoOfRequest
				})
			}
			
		}

		this.setState({
			showUserExceededTxt : false
		})
		var urlForPlanetSearch = 'http://swapi.co/api/planets?search=' + planetName;
		this.props.dispatch(actions.searchPlanets(urlForPlanetSearch));
	}
	getCssObject(population){
		var lowerfontLimit=30;
		var higherfontLimit=50;
		var higherLimitPopulation = this.state.maxPopulation;
		var minLimitForpopulation = this.state.minPopulation==0 ? 1 : this.state.minPopulation;
		
		if(higherLimitPopulation==0 || parseInt(population)==0 || isNaN(parseInt(population))){
			return {
				'fontSize' : '40px'
			}
		}
		
		var fontsize = lowerfontLimit +  (population/(higherLimitPopulation - minLimitForpopulation)) *(higherfontLimit - lowerfontLimit );
		
		return {
			'fontSize' : fontsize + 'px'
		}
	}
	createHtmlForResult(){
		var data = this.state.results;
		return data.map((element,index,array)=>{
		
			return (

				<li key={index} className='list-item' style={this.getCssObject(element.population)}>
					<span className='block'><span className='tag-item'>Planet Name :</span>{element.name}</span>
					<span className='block'><span className='tag-item'>Population : </span>{element.population}</span>
					<span className='block'><span className='tag-item'>Rotation Period :</span> {element['rotation_period']}</span>
				</li>

				);
		})
	}
	
	render(){
		var userName = JSON.parse(localStorage.getItem('starwarApp')).username;
		return (
	    <div className='search-page-container'>
	    <HeaderComponent loggedInUser={userName} showLogout={true}/>
	    
	    <div className='search-input-section'>
			<div className='input-section' ref='input-section'>
			  <input ref='planet-name' className='search-bar' onChange={this.onChangeSearchbox} placeholder='Find your planet' />
			  <span className='search-icon glyphicon glyphicon-search'></span>
			  <ul className='auto-suggestion' ref='auto-suggestions'>
				  
			  </ul>
			</div>
			<div className='result-section'>
				{this.state.showUserExceededTxt && <div className="exceed-error-tag">Sorry !! You have exceeded your search limit.Please try after sometime</div>}			
				<ul className='list-container'>
				{this.createHtmlForResult()}
				</ul>
				{this.props.data.isFetching && <LoaderComponent />}	
				

			</div>
				
		</div>
	     	
	      
	    </div>
	  );
	}

}
function select(state) {
	return {
		data: state.SearchPageReducer
	};
}


export default connect(select)(SearchPage);


