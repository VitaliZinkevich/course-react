import { API } from "aws-amplify";

const CONTACT_FORM_SENDED ='CONTACT_FORM_SENDED';

const sendContactForm=function(messageData) {
    let payLoad = {
        body:{
            ...messageData
        },
        headers:{
           
        }};
  return {
    type: CONTACT_FORM_SENDED,
    payload: API.post ('contactFormMessage','' , payLoad)
        .then (data=> console.log(data))
        .catch (err => console.log(err))};
};

export {sendContactForm};