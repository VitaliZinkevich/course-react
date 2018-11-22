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


export {saveBookingOpt, delBookingOpt}