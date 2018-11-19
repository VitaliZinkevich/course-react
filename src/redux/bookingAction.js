const SAVE_BOOKING_OPTIONS='SAVE_BOOKING_OPTIONS';

const saveBookingOpt=function(options) {
  return {
    type: SAVE_BOOKING_OPTIONS,
    bookingOpions: options}
   
}


export {saveBookingOpt}