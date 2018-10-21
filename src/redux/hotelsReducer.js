import {fromJS} from 'immutable'

let initState = {
        
    foodTypes : ['Любое', 'Без питания','Завтраки','Завтрак и ужин','Завтрак, обед и ужин', 'Все включено'],
    starsTypes : [ 'Любой','2','3','4','5'],
    hotelPending: false,
    hotelPendingErrors: null,
    hotels:[],
    mainList:[],
    selectedHotels:[],
    search:'',
    foodType: null,
    starsType:null,
    startDateFrom:null,
    startDateTo:null,
    nights:[],
    adults: 1,
    children: null,
    
}

//console.log (initState)
//initState= fromJS(initState)
//console.log (initState.get('hotels').get('foodTypes').toJS())

const hotelsReducer = (state = initState, action) => {

    let newState = fromJS(state)

    switch (action.type) {
        
        case 'HOTELS_PENDING':{
        newState = newState.setIn (['hotelPending'], true).toJS()
        return newState
        }

        case 'HOTELS_FULFILLED':{
        newState = newState.setIn (['hotelPending'], false).setIn(['hotels'] , action.payload.data).setIn(['mainList'] , action.payload.data).toJS()
        return newState}

        case 'HOTELS_REJECTED':{
        newState = newState.setIn (['hotelPending'] ,false).setIn(['hotelPendingErrors'], action.payload).toJS()
        return newState}

        case 'SEARCH_FORM_CHANGE': {
            // console.log ('SEARCH_FORM_CHANGE')
            //console.log (action)
            
            
            if  (action.formName == 'mainList') {
                //console.log ('mainList')

                let addtoSelectedHotels = newState.get('mainList').find ((elem)=>{ return elem.get("_id") == action.fieldValue._id})
                //console.log (addtoSelectedHotels)
                let newMainList = newState.get ('mainList').filter ((element)=>{
                    if (element.get('_id')===action.fieldValue._id) {
                        return false
                    } else {
                        return true
                    }
                })
                //console.log (newMainList)
                let newSelectedHotels = newState.get ('selectedHotels').push(addtoSelectedHotels)
                //console.log ('RETURN')
                
                newState =newState.setIn(['mainList'],newMainList).setIn(['selectedHotels'],newSelectedHotels)
                return newState.toJS()
            }

            if  (action.formName == 'selectedList') {
                console.log ('selectedList')

                let addtoMainList = newState.get('selectedHotels').find ((elem)=>{ return elem.get("_id") == action.fieldValue._id})
                //console.log (addtoSelectedHotels)
                let newSelectedHotels = newState.get ('selectedHotels').filter ((element)=>{
                    if (element.get('_id')===action.fieldValue._id) {
                        return false
                    } else {
                        return true
                    }
                })
               
                let newMainList = newState.get ('mainList').push(addtoMainList)
                //console.log ('RETURN')
                
                newState =newState.setIn(['mainList'],newMainList).setIn(['selectedHotels'],newSelectedHotels)
                return newState.toJS()
            }

            if (action.formName == 'search') {
                
                newState = newState.setIn(['search'],action.fieldValue)

                if (newState.get('search') === '') {
                    //console.log (newState.get('selectedHotels').isEmpty())
                    if (newState.get('selectedHotels').isEmpty() == true) {
                        newState = newState.setIn(['mainList'], newState.get('hotels'))
                        return newState.toJS()
                    } else {
                        
                        // если есть объекты в выбранных
                        let newHotels = newState.get('hotels').filter((el)=>{
                            let isInSelected = false
                            newState.get('selectedHotels').forEach((selEl)=>{
                                if (selEl.get('_id') === el.get('_id')) {
                                    isInSelected = true 
                                }
                            })
                            //console.log (isInSelected)
 
                            if (isInSelected === true){
                                return false
                            } else {
                                return true
                            }
                     
                        })

                        newState = newState.setIn(['mainList'],newHotels)
                        return newState.toJS()
                    }
                    
                } else {

                    let newMainList = newState.get('hotels').filter((el)=>{
                        if (el.get('name').toLowerCase().indexOf(newState.get('search').toLowerCase()) === -1 ){
                            return false
                        } else {
                            if (newState.get('selectedHotels').indexOf(el) === -1) {
                                return true
                            } else {
                                return false
                            }
                     
                        }
        
                    })

                    newState = newState.setIn(['mainList'], newMainList)
                    return newState.toJS()
                }
  
            }

            
 

            
        }
        
        default:
        return state
        }
   
  }
  
export default hotelsReducer