import { API } from "aws-amplify";

const SAVE_BOOKING_OPTIONS='SAVE_BOOKING_OPTIONS';

const saveBookingOpt=function(options) {
  return {
    type: SAVE_BOOKING_OPTIONS,
    bookingOpions: options}
   
}

const DEL_BOOKING_OPTIONS='DEL_BOOKING_OPTIONS';
const delBookingOpt=function(options) {
  return {
    type: DEL_BOOKING_OPTIONS,
    }
   
}

const SAVE_ORDER = 'SAVE_ORDER'
const saveOrder=function(order) {
  let payLoad = {
    body:{
        order,
    },
    headers:{
       
    }};
  return {
    type: SAVE_ORDER,
    payload: API.post ('createOrder','' ,payLoad)
      .then (data=> console.log(data))
      .catch (err => console.log(err))
    }
}

const UPDATE_ORDER = "UPDATE_ORDER"
const updateOrder=function(ordersToUpdate) {
  let payLoad = {
      body:{
        ordersToUpdate,
      },
      headers:{}
    };

  return {
    type: UPDATE_ORDER,
    payload: API.put ('updateOrder','' , payLoad)
      .then (data=> console.log(data))
      .catch (err => console.log(err))
    }
}



export {saveBookingOpt, delBookingOpt, saveOrder, updateOrder}