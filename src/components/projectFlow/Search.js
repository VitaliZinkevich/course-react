import React, { Component } from 'react';
// redux
import { connect } from 'react-redux'
// materialize and custom css
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

// action
import {fetchHotels} from '../../redux/actions'
// form parts 
import NightsForm from './SearchFormParts/NightsForm'

class Search extends Component{
    

    constructor(props) {
        super(props);
        

        document.addEventListener('DOMContentLoaded', ()=> {
            let elems = document.querySelectorAll('.datepicker');
            let instances = M.Datepicker.init( elems, {
                format: 'dd mmmm yyyy'
              
            });
            this.datepickers = instances 
        });

        document.addEventListener('DOMContentLoaded', function() {
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems, {

            });
            this.personSelects = instances
            });
    
          
    this.state={
        foodTypes:this.props.foodTypes.toJS(),
        starsTypes:this.props.starsTypes.toJS(),
        hotels: this.props.hotels.toJS(),
        dateFrom:null,
        dateTo:null,
    }      
        
    }

    handleChange=(e)=>{
        // как брать значения с даты выбора
        console.log (e.target.name)
        
        this.datepickers.map((e)=>{
            console.log (e.toString())
        })


    }

    checkInstaces= ()=>{
        console.log (this.datepickers)
        console.log (this.personSelects)
    }

    render() {
        

   

    
        
    return (

    <main className='container'>

    <div className='row'>
    <div className='col s6'>

    <h3>Start date</h3>
    <p className='text-flow'> From</p>   
    <input  name='dateFrom' type="text" className="datepicker"/>
    <p className='text-flow'> To</p> 
    <input  name='dateTo' type="text" className="datepicker"/> 
    </div>

    <div className='col s6'>
    <h3>For how many nights</h3>
    <NightsForm />
    </div>
    </div>

    <div className='row'>
    <h3>Guests</h3>
        <div className="input-field col s6">
        <select>
        <option value="" disabled >Number of children</option>
        <option value="0"> 0</option>
        <option value="1"> 1</option>
        <option value="2"> 2</option>
        <option value="3"> 3</option>
        </select>
        <label>Children</label>
        </div>

        <div className="input-field col s6">
            <select>
            <option value="" disabled >Number of adults</option>
            <option value="0"> 0</option>
            <option value="1"> 1</option>
            <option value="2"> 2</option>
            <option value="3"> 3</option>
            </select>
            <label>Adult</label>
        </div>

    </div>

    
    <div className='row right'>
    <button 
    onClick={this.checkInstaces}
    className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">search</i></button>
    </div>
    
    
    



    </main> 
      
    );
  }
}

const mapStateToProps = (state) => {
    return {
      
        foodTypes: state.get ('foodTypes'),
        starsTypes: state.get ('starsTypes'),
        hotels: state.get('hotels')
      }
  }



export default connect(mapStateToProps)(Search);