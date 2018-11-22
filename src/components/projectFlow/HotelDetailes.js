import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {Carousel} from 'react-materialize'
import {fetchHotels} from '../../redux/hotelsActions'


 class HotelDetailes extends PureComponent {

  state={
    modalMessage: false
  }

  componentDidMount (){
        if (this.props.hotels.size === 0){
          this.props.dispatch (fetchHotels)
      }
  }

  render() {

    let hotel = null
    let fotos = null

  if (this.props.hotels.size !== 0) {
     hotel = this.props.hotels.find (el=>el.get ('_id') === this.props.match.params.id) || undefined
     fotos = hotel.getIn (['description', 'fotos']) || undefined

  }
   
    
    return (
      <main>
        <div className='center'><p><strong>{(hotel !== null) ? hotel.getIn (['name']) : 'Загрузка'}</strong></p></div>
        {(hotel !== null) ? hotel.getIn (['description', 'text']) : 'Загрузка'}
        {(fotos !== null) ? <Carousel 
        options={{fullWidth: true, indicators: true,noWrap:true}} 
        images={fotos} 
        className='margin-arround'/> : 'Загрузка'}
      </main>
    )
  }
}

let mapStateToProps = (state) => {
    
    return {
            hotels: state.hotelsData.get ('hotels'),
        }
  }

export default connect (mapStateToProps)(HotelDetailes)
