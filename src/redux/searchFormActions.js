const SEARCH_FORM_CHANGE='SEARCH_FORM_CHANGE';
//const COUNTER_BUTTON_ADD='COUNTER_BUTTON_ADD';

const seacrhFormHandleChangeRedux=function(formName, fieldValue, hotelsList) {
  return {
    type: SEARCH_FORM_CHANGE,
    formName,
    fieldValue
  };
}

// диспатчнуть актион и сразу получить в этот стейт копию гостиниц и строить список из него.


// const counterButton_add=function(counterid,addvalue) {
//   return {
//     type: COUNTER_BUTTON_ADD,
//     counterid:counterid,
//     addvalue:addvalue,
//   };
// }

export {
  seacrhFormHandleChangeRedux
}
