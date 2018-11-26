import {fromJS} from 'immutable'
import moment from 'moment'

let initState = {
    
    // Search component connected state
    hotelPending: false,
    hotelPendingErrors: '',
    hotels:[],
    mainList:[],
    selectedHotels:[],
    search:'',
    foodType: 'Any',
    starsType:'Любой',
    dateFrom:null,
    dateTo:null,
    nights:[1],
    adults: 1,
    children: 0,
    formMessages:[],
    // PriceList component connected state
    priceListStatus: false, // false as default
    currentPage: 1,
    isGetQueryString: false
}



const hotelsReducer = (state = initState, action) => {

    let newState = fromJS(state)

    switch (action.type) {
        
        case 'HOTELS_PENDING':{
        newState = newState.setIn (['hotelPending'], true)
        return newState
        }

        case 'HOTELS_FULFILLED':{
        newState = newState.setIn (['hotelPending'], false).setIn(['hotels'] , fromJS (action.payload.data)).setIn(['mainList'] , fromJS (action.payload.data))
        return newState}

        case 'HOTELS_REJECTED':{
        newState = newState.setIn (['hotelPending'] ,false).setIn(['hotelPendingErrors'], action.payload)
        return newState}

        case 'SEARCH_FORM_CHANGE': {
            
            newState= newState.set ('priceListStatus', false).set ('currentPage', 1)
            
            if  (action.formName === 'mainList') {
                //console.log ('mainList')

                let addtoSelectedHotels = newState.get('mainList').find ((elem)=>{ return elem.get("_id") === action.fieldValue.get ('_id')})
                //console.log (addtoSelectedHotels)
                let newMainList = newState.get ('mainList').filter ((element)=>{
                    if (element.get('_id')===action.fieldValue.get ("_id")) {
                        return false
                    } else {
                        return true
                    }
                })
                //console.log (newMainList)
                let newSelectedHotels = newState.get ('selectedHotels').push(addtoSelectedHotels)
                //console.log ('RETURN')
                
                newState =newState.setIn(['mainList'],newMainList).setIn(['selectedHotels'],newSelectedHotels).setIn(['formMessages'], checkErrors(newState.get('dateFrom'), newState.get('dateTo')))
                return newState
            }

            if  (action.formName === 'selectedList') {
               

                let addtoMainList = newState.get('selectedHotels').find ((elem)=>{ return elem.get("_id") === action.fieldValue.get ('_id')})
                //console.log (addtoMainList)
                let newSelectedHotels = newState.get ('selectedHotels').filter ((element)=>{
                    if (element.get('_id')===action.fieldValue.get ('_id')) {
                        return false
                    } else {
                        return true
                    }
                })
               
                newState = newState.setIn(['selectedHotels'],newSelectedHotels).setIn(['formMessages'], checkErrors(newState.get('dateFrom'), newState.get('dateTo')))
                //console.log (newState.get ('search').indexOf (addtoMainList.get('name')))
                
                let newMainList = null
                
                if (newState.get ('search') === '' && (newState.get ('starsType')) === 'Любой'){
                    // console.log('ALL CLEAR')
                    newMainList = newState.get ('mainList').push (addtoMainList)
                }

                //console.log (addtoMainList.get('name').toLowerCase().indexOf (newState.get ('search').toLowerCase()))
                if (newState.get ('starsType') === 'Любой' && newState.get ('search')!=="" && addtoMainList.get('name').toLowerCase().indexOf (newState.get ('search').toLowerCase()) !== -1){
                    // console.log('starsType CLEAR seacrh ++++')
                    newMainList = newState.get ('mainList').push (addtoMainList)
                }

                if (newState.get ('search') === '' && parseInt(newState.get ('starsType')) === addtoMainList.get ('stars')) {
                    // console.log('seacrh CLEAR starsType ++++')

                    newMainList = newState.get ('mainList').push (addtoMainList)
                } 

                if (newState.get ('search') !== "" && addtoMainList.get('name').toLowerCase().indexOf (newState.get ('search').toLowerCase())!== -1 && parseInt(newState.get ('starsType')) === addtoMainList.get ('stars')) {
                    // console.log('seacrh ++++ starsType ++++')
                    newMainList = newState.get ('mainList').push (addtoMainList)
                } 
                
                if (newMainList != null) {
                    newState = newState.setIn(['mainList'],newMainList)
                }
                
                
                return newState
            }

            if (action.formName === 'search' || action.formName === 'starsType') {
               
                let errors = fromJS ([])

                if ( action.formName === 'starsType') {
                    newState = newState.setIn(['starsType'],action.fieldValue)
                } else {
                    newState = newState.setIn(['search'],action.fieldValue)
                }
                
                
                let newMainList 

                // проверям текстовый фильтр

                if (newState.get('search') === '') {
                    newMainList = newState.get ('hotels')
                    
                } else {
                    newMainList = newState.get ('hotels').filter((el)=>{
                        if (el.get('name').toLowerCase().indexOf(newState.get('search').toLowerCase()) === -1 ){
                            return false
                        } else {
                            return true                   
                        }
        
                    })
                }


                if (newMainList.size === 0 ) {
                    errors = errors.push('Фильтр по НАЗВАНИЮ удаляет все элементы')
                    newState = newState.setIn(['mainList'], newMainList).setIn (['formMessages'], errors.concat (checkErrors(newState.get('dateFrom'), newState.get('dateTo'))))
                    return newState   
                } 

                // проверяем уже выбранные объекты

                if (newState.get('selectedHotels').isEmpty() === true) {
                    
                    // пусто ничего не меняем
                } else {
                    newMainList = newMainList.filter((el)=>{
                        
                     if (newState.get('selectedHotels').indexOf(el) === -1) {
                        return true
                     } else {
                        return false
                     }
                    })
                }
               
                // Проверям звезды

                if (newState.get('starsType') === 'Любой') {
                    // ничего не меняем
                } else {
                    newMainList = newMainList.filter ((el)=>{
                        if (el.get('stars') === parseInt(newState.get('starsType'))) {
                            return true
                        } else {
                            return false
                        }
                    })

                }


                if (newMainList.size === 0 ) {
                    errors = errors.push('Фильтр по ЗВЕЗДНОСТИ удаляет все элементы')   
                    newState = newState.setIn(['mainList'], newMainList).setIn (['formMessages'], errors.concat (checkErrors(newState.get('dateFrom'), newState.get('dateTo'))))
                    return newState
                    } 
                              
                    newState = newState.setIn(['mainList'], newMainList).setIn (['formMessages'], errors.concat (checkErrors(newState.get('dateFrom'), newState.get('dateTo'))))
                    return newState
                }

            if (action.formName === 'foodType') {
                newState = newState.setIn (['foodType'], action.fieldValue ).setIn(['formMessages'], checkErrors(newState.get('dateFrom'), newState.get('dateTo')))
                
               return newState

            }
            
            if (action.formName === 'children' || action.formName === 'adults') {

                if (action.formName === 'children') {
                    newState = newState.setIn (['children'], action.fieldValue ).setIn(['formMessages'], checkErrors(newState.get('dateFrom'), newState.get('dateTo')))
                } else  {
                    newState = newState.setIn (['adults'], action.fieldValue ).setIn(['formMessages'], checkErrors(newState.get('dateFrom'), newState.get('dateTo')))
                }
 
               return newState

            }

            if (action.formName === 'nights'){

                let newNightsList =  newState.get ('nights')

                if (newNightsList.indexOf (action.fieldValue) === -1 ) {
                    newNightsList = newNightsList.push(action.fieldValue)
                    
                } else {
                    
                    newNightsList = newNightsList.filter ((el)=>{
                        if (el === action.fieldValue) {
                                return false
                            } else {
                                return true
                            }
                        })
                }

                let errors = fromJS ([])

                if (newNightsList.size===0) {
                    errors = errors.push('Количество НОЧЕЙ должно быть выбрано')
                    newState= newState.setIn (['formMessages'], errors.concat (checkErrors(newState.get('dateFrom'), newState.get('dateTo')))).setIn (['nights'], newNightsList )
                }

                newState = newState.setIn (['nights'], newNightsList ).setIn (['formMessages'], errors.concat (checkErrors(newState.get('dateFrom'), newState.get('dateTo'))))

                return newState
            }

            if (action.formName === 'dateFrom' || action.formName === 'dateTo') {
               
                if (action.formName === 'dateFrom') {
                    newState = newState.setIn (['dateFrom'], action.fieldValue)
                } else {
                    newState = newState.setIn (['dateTo'], action.fieldValue)
                }

                newState = newState.setIn (['formMessages'], checkErrors (newState.get('dateFrom'), newState.get('dateTo')))
                

                return newState
            }
             
            break;
        }
        
        case 'PRICE_LIST_ACTIVATE':{
            //console.log ('PRICE_LIST_ACTIVATE CASE')
            newState = newState.setIn (['priceListStatus'], true).setIn (['isGetQueryString'], true)
            return newState
            
        }

        case 'PAGINATION_ACTIVE_PAGE':{
            //console.log (action.page)
            newState = newState.setIn (['currentPage'], action.page)
            return newState
        }

        case 'LINK_WITH_SEARCH_QUERY' : {
            //console.log (action.settings)
            let {dateFrom, dateTo, nights, adults ,children,foodType, starsType ,currentPage ,selectedHotels} = action.settings
            //console.log(selectedHotels)

            
            newState = newState.setIn (['isGetQueryString'], true)

            if (dateFrom) {
                newState = newState.setIn (['dateFrom'], dateFrom)
            }

            if (dateTo) {
                newState = newState.setIn (['dateTo'], dateTo)
            }

            if (nights) {
                let newNights = fromJS(nights.split(',').map (el=>parseInt(el)))
                //console.log (newNights)
                newState = newState.setIn (['nights'], newNights)
            }

            if (adults) {
                newState = newState.setIn (['adults'], parseInt (adults))
            }

            if (children) {
                newState = newState.setIn (['children'], parseInt (children))

            }

            if (foodType) {
                newState = newState.setIn (['foodType'], foodType)
            }

            if (starsType) {
                newState = newState.setIn (['starsType'], starsType)
            }
           
            if (currentPage) {
                newState = newState.setIn (['currentPage'], parseInt (currentPage))
            }

            // когда диспатчит это еще нет отелей с сервера и списко пуст
            //console.log(selectedHotels)
            if (selectedHotels || selectedHotels === '') {
                // console.log("SELECTED HOTELS REDUCER")
            let querySelectedHotels = selectedHotels.split(',')
            //console.log(querySelectedHotels)
            
           
            let hotels = newState.get ('hotels')
           
           
          
            // console.log(newSelectedList)

            let newSelectedList = hotels.filter ((el)=>{
               //  console.log((querySelectedHotels.indexOf(el.get('_id')) !== -1))
                if (querySelectedHotels.indexOf(el.get('_id')) !== -1) {
                    return true
                } else {
                    return false
                }

            })

            let newMainList

            
            if (selectedHotels === '') {
                // console.log('NO STARS TYPE')
                
                if (starsType === 'Любой') {
                    newMainList = hotels
                    

                } else {
                    // console.log('MAKING STARS TYPE')
                    newMainList = hotels.filter ((el)=>{
                        if ((el.get('stars').toString()) === starsType) {
                            // console.log(((el.get('stars').toString()) === starsType))
                            return true
                        } else {
                            return false
                        }
         
                    })
                }

                


            } else {
                
                newMainList = hotels.filter ((el)=>{
                    // console.log((querySelectedHotels.indexOf(el.get('_id')) !== -1))
                    if (querySelectedHotels.indexOf(el.get('_id')) !== -1) {
                        return false
                    } else {
                        return true
                    }
     
                })
            }

           

            //console.log(newSelectedList)
            newState = newState.setIn (['selectedHotels'], newSelectedList).setIn (['mainList'], newMainList)

         }

            newState=newState.setIn (['priceListStatus'], true)
            return newState

    }


        case 'CLEAR_FORM':{
            newState = newState
            .setIn (['mainList'], newState.getIn (['hotels']))
            .setIn (['selectedHotels'], fromJS([]))
            .setIn (['search'], '')
            .setIn (['foodType'], 'Any')
            .setIn (['starsType'], 'Любой')
            .setIn (['dateFrom'], null)
            .setIn (['dateTo'], null)
            .setIn (['nights'], fromJS([1]))
            .setIn (['adults'], 1)
            .setIn (['children'],0)
            .setIn (['formMessages'],fromJS([]))
            .setIn (['priceListStatus'],false)
            .setIn (['currentPage'],1)

            return newState

        }
        default:
        return newState
        }
   
  }
  
export default hotelsReducer

// проверить даты и вернуть массив ошибок

function checkErrors (startFrom, startTo) {
   
   let errors = []

   let start = moment(startFrom, "DD-MM-YYYY")
   let end = moment(startTo, "DD-MM-YYYY")

   //console.log (!(start.isValid()))

   if (start.isValid()) {
   } else {
    errors.push('Выберите дату С')
   }

   if (end.isValid()) {
   } else {
        errors.push('Выберите дату ПО')
    }
   
   
   if (start.isValid() && end.isValid()) {
       
  
    if (end.diff (start, 'days') > 5 ){
        errors.push('От начала до конца не более 5 дней')
    }

    if (!moment(start).isSameOrBefore(end)) {
        errors.push('Дата С такая же или раньше даты ПО')
    }

   } 
   
return fromJS (errors)

}

