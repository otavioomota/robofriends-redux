import React, { Component } from 'react';
import { connect }  from 'react-redux';

import CardList from '../Components/CardList/CardList';
import SearchBox from '../Components/SearchBox/SearchBox';
import Scroll from '../Components/Scroll/Scroll';

import './App.css';
import 'tachyons';

import { setSearchField, requestRobots  } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    isPedding: state.requestRobots.isPedding,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      checked:false
    }
  }

  componentDidMount(){
    this.props.onRequestRobots()
  }

  AlphabeticOrder = () => {
    this.setState({
      checked: !this.state.checked
    })
  }

  Compare = (a,b) =>{

    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }
  render(){

    const { checked } = this.state;
    const { searchField, onSearchChange, isPedding, robots } = this.props;

    const filteredRobots = robots.filter( robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
      || robot.email.toLowerCase().includes(searchField.toLowerCase())
    })

    checked
    ? (filteredRobots.sort(this.Compare))
    : console.log(checked)

    return (isPedding)
    ? <h1>Loading ... </h1>
    : (
        <div className="tc">
          <div className="bg">
            <h1>Robot Friends</h1>
            <SearchBox
              onSearchChange={onSearchChange}
              AlphabeticOrder={this.AlphabeticOrder}
             />
          </div>
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>
        </div>
      )

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
