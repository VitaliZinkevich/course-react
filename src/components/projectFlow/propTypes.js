import PropTypes from 'prop-types';
// immutable proptypes
import ImmutablePropTypes from 'react-immutable-proptypes'

const hotelObjPropTypeArray = PropTypes.oneOfType ([
    ImmutablePropTypes.listOf(),
    ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
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
        })
    ),
])


const ordersPropTypesArray = PropTypes.oneOfType ([
    ImmutablePropTypes.listOf(),
    ImmutablePropTypes.listOf ( 
      ImmutablePropTypes.contains({
        number: PropTypes.number,
        hotel: PropTypes.string,
        room: PropTypes.string,
        date: PropTypes.string,
        night: PropTypes.number,
        adults: PropTypes.number,
        children: PropTypes.number,
        contactAdress: PropTypes.string,
        contactTel: PropTypes.string,
        touristsData: ImmutablePropTypes.listOf(
          ImmutablePropTypes.contains({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            passSeries: PropTypes.string,
            passNumber: PropTypes.string,
            passValidTill: PropTypes.string,
          })
        ),
        statusConfirmed: PropTypes.number,
        statusPayment: PropTypes.number,
      }

      )
    )])

    const singleObjHotel = PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string,
            stars: PropTypes.number,
            rooms: PropTypes.arrayOf( PropTypes.shape ({
                    name:PropTypes.string.isRequired,
                    accomodation: PropTypes.arrayOf(PropTypes.string),
                    price: PropTypes.shape(
                      PropTypes.shape({
                        adult:PropTypes.number,
                        children:PropTypes.number ,
                    }))
                })
    
            ),
        })

        const singleRoom = PropTypes.shape ({
            name:PropTypes.string,
            accomodation: PropTypes.arrayOf(PropTypes.string),
            price: PropTypes.shape(
              PropTypes.shape({
                adult:PropTypes.number,
                children:PropTypes.number ,
            }))
        })


export {hotelObjPropTypeArray, ordersPropTypesArray, singleObjHotel, singleRoom}