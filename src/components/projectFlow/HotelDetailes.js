import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {Carousel} from 'react-materialize'
import {fetchHotels} from '../../redux/hotelsActions'

 class HotelDetailes extends PureComponent {


  componentDidMount (){
        if (this.props.hotels.size === 0){
          this.props.dispatch (fetchHotels)

      }
  }

  render() {

    let hotel = null
    let fotos = null

  if (this.props.hotels.size !== 0) {
     hotel = this.props.hotels.find (el=>el.get ('_id') === this.props.match.params.id)
     fotos = hotel.getIn (['description', 'fotos'])
  }
   
    
    return (
      <div>
        <div className='center'><p><strong>{(hotel !== null) ? hotel.getIn (['name']) : 'Загрузка'}</strong></p></div>
        {(hotel !== null) ? hotel.getIn (['description', 'text']) : 'Загрузка'}
        {(fotos !== null) ? <Carousel options={{fullWidth: true, numVisible: 2,}} images={fotos} /> : 'Загрузка'}
      </div>
    )
  }
}

let mapStateToProps = (state) => {
    
    return {
            hotels: state.hotelsData.get ('hotels'),
        }
  }

export default connect (mapStateToProps)(HotelDetailes)
