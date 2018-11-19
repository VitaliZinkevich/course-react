import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

 class MyOrders extends PureComponent {

    render() {
        let jsOrders
        if (this.props.orders !== null ) {
            jsOrders = this.props.orders.toJS()
        }

        console.log(jsOrders)
        
    return (
      <main>
          
        {(jsOrders.length == 0) ? <div className='center'>Дорогой {this.props.userName}. У вас нет заказов</div>: null}

      </main>
    )
  }
}

let mapStateToProps = (state) => {
    return {

    role: state.auth.get ('role'),
    userName: state.auth.get ('userName'),
    orders: state.auth.get ('orders')
    
    }
}

export default connect(mapStateToProps)(MyOrders)