import React, {PureComponent} from 'react'
import {CollapsibleItem, Collapsible,Row, Col} from 'react-materialize'

import HotelListItem from './HotelListItem'

import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'

export class HotelsLists extends PureComponent {

    static propTypes={
        hotels: ImmutablePropTypes.listOf (ImmutablePropTypes.contains({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          stars: PropTypes.number.isRequired,
          rooms: ImmutablePropTypes.listOf(
              ImmutablePropTypes.contains ({
                  name:PropTypes.string.isRequired,
                  accomodation: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
                  price: ImmutablePropTypes.map(
                      ImmutablePropTypes.contains({
                      adult:PropTypes.number,
                      children:PropTypes.number ,
                  }))
              })
    
          ),
      })),
      selectedHotels:ImmutablePropTypes.listOf (ImmutablePropTypes.contains({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        stars: PropTypes.number.isRequired,
        rooms: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains ({
                name:PropTypes.string.isRequired,
                accomodation: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
                price: ImmutablePropTypes.map(
                    ImmutablePropTypes.contains({
                    adult:PropTypes.number,
                    children:PropTypes.number ,
                }))
            })
  
        ),
    }))
      }

 


  render() {
    //  console.log ('RENDER HOTEL LIST')
     //console.log (this.props)

     let collapsibleItemsMinsk = this.props.hotels.filter((el)=>{return(
        el.get ('region') ==='Минская область')}).map ((el)=>{
            return (
                
                <HotelListItem
                    key={el.get ('_id')}
                    hotel={el}
                    name='mainList'
                
                />
                 )
     } )

     let collapsibleItemsVitebsk = this.props.hotels.filter((el)=>{return(
        el.get ('region') ==='Витебская область')}).map ((el)=>{
            return (
               
                   <HotelListItem
                       key={el.get ('_id')}
                       hotel={el}
                       name='mainList'
                    />
           )
       
    } )
      

      let selectedHotels = this.props.selectedHotels.map ((element)=>{
          return (


            <HotelListItem
                key={element.get ('_id')}
                hotel={element}
                name='selectedList'
                
            />

        )

      })

    return (
      <div> 
            <Row>
                <Col s={8}>

                <h5>Список отелей</h5>
               
                    <Collapsible 
                    defaultActiveKey={0}
                    
                    >
                        <CollapsibleItem 
                        header='Минская область' 
                        icon='location_on'>
                            {collapsibleItemsMinsk}
                        </CollapsibleItem>
                    </Collapsible>

                    <Collapsible defaultActiveKey={0}
                    >
                        <CollapsibleItem  
                            header='Витебская область' 
                            icon='location_on'>
                            {collapsibleItemsVitebsk}
                        </CollapsibleItem>
                    </Collapsible>
                   
                </Col>

                <Col s={4}>
                        <div className='left'>
                        <h5>Выбранные отели</h5>
                        {selectedHotels}
                        </div>
                </Col>

            </Row>
      </div>
    )
  }
}

export default HotelsLists
