import React, { Component } from 'react';

import { connect } from 'react-redux'

import {fetchHotels} from '../../redux/actions'

class Search extends Component{

  // запрашивает каждый раз как переходит по ссылке. 
  // запрос нужно делать 1 раз
  componentWillMount() {
      this.props.fetchHotels()
  }

  render() {
      console.log (this.props)
    return (
    <main className='container'>
        im search
    </main> 
      
    );
  }
}

const mapStateToProps = (state) => {
    return {
      
        foodTypes: state.get ('foodTypes'),
        starsTypes: state.get ('starsTypes'),
      }
  }

  const mapDispathToProps = (dispatch) => {
    return {
        fetchHotels: ()=>dispatch (fetchHotels)
    }
  }

export default connect(mapStateToProps, mapDispathToProps)(Search);