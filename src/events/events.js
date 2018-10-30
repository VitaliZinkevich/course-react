import {EventEmitter} from 'events';

// добавление нового клиента
let mainFormFillEvents= new EventEmitter(); 

// query string 
let queryStringEvent= new EventEmitter(); 

export {mainFormFillEvents, queryStringEvent};