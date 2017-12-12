import React, { Component } from 'react';
import { searchPlanet } from "./../action-creators/starwars_actions";
import { connect } from "react-redux";
import Planet from './Planet';
import constants from '../common/constants';

class PlanetSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            planets: []
        }
        this.searchCount=0;
        this.startTime="";
        
        this.searchQueryHandler = this.searchQueryHandler.bind(this);
        this.sortPopulation = this.sortPopulation.bind(this);
    }
    componentWillMount(){
        this.unmount = function unMountChild() {
            this.props.unMountPlanet();
        }
    }

    searchQueryHandler(event) {
        let searchString = event.target.value;
        searchString.trim();
        if (searchString.length == 0) {
            this.setState({ searchQuery: searchString, planets: [] })
        }
        if (searchString.length > 0) {
            this.setState({ searchQuery: event.target.value }, this.callSearchAction)
        }
        else {
            this.setState({ searchQuery: searchString })
        }

    }
    callSearchAction() {
        
        let endTime="";
        let seconds=0;

        if(this.searchCount==0)
        {
            this.startTime=new Date();
           
        }
        this.searchCount++;
        if(this.searchCount==15)
        {
            endTime=new Date();
            console.log(endTime)
            seconds=(endTime.getTime()-this.startTime.getTime())/1000;
        }
        console.log(`seconds: ${seconds}
        searchCount: ${this.searchCount}`)
        if((seconds<=60 && this.searchCount<=15)|| this.props.user=="Luke Skywalker")
            searchPlanet(this.state.searchQuery)
        else
        {
            alert("Only User Luke Skywalker can perform more than 15 searches in a minute!! Logging Out...");
            this.unmount();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.planets != undefined) {
            this.setState({ planets: nextProps.planets }, this.sortPopulation)
        }
    }

    sortPopulation() {
        let sortedPlanets = Object.assign([], this.state.planets);
        let planets = Object.assign([], this.state.planets);
        let population = [];
        sortedPlanets.map((item) => {
            if (item.population == undefined || item.population == "unknown") {
                item.population = 0;
            }
        });

        sortedPlanets.sort(function (a, b) {
            return a.population - b.population;
        });

        for (let i in planets) {
            planets[i].sortOrder = 0;
            for (let j in sortedPlanets) {
                if (planets[i].name == sortedPlanets[j].name) {
                    planets[i].sortOrder = j;
                    break;
                }
            }

        }
        this.setState({ planets: planets });
    }

    render() {
        let planets = this.state.planets;
        let listOfPlanets = [];
        if(this.state.planets.length<=0)
        {
            listOfPlanets=<div className="no-planets">
            <h3>
            {this.searchCount!=0?"No planet found matching the search criteria.":"Please enter a planet name to be searched."}</h3>
            </div>
        }
        planets.map((item, index) => {
            listOfPlanets.push(<Planet key={index}
                 name={item.name} population={item.population}
                 sortOrder={item.sortOrder} 
                 />)
        })
       
        return (
            <div >
               <h2> {"Welcome,"+ this.props.user}</h2>
            <div className="planet-search">
                <span>Enter a planet name : </span> <input type="text" value={this.state.searchQuery} 
                onChange={this.searchQueryHandler} />
                {/*<button  onClick={this.unmount()}>Login</button>*/}
                    {listOfPlanets}
            </div>
            </div>
        )
    }
}
export default connect(state => (
    {
        planets: state.starwarsReducer.planets
    }
))(PlanetSearch);
