import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { mount } from 'enzyme';

import BookingForm from '../components/projectFlow/BookingForm'

describe('Booking Form', function() {

    it ('Render with no passing state',()=>{
    let state  = {}
    let instance = mount(<BookingForm location={state} history={[]}/>)
    

    expect (instance.find('div').text()).toBe("Wrong enter")
    })


    it ('Render with passing state',()=>{
        
        let location = { state: {  date:'01.01.2018',
                        night:10,
                        hotel:{"_id" : "5b06859e5089ec123b9e668c",
                        "type" : "санаторий",
                        "name" : "Берестье",
                        "region" : "Минская область",
                        "stars" : 2,
                        "rooms": [{name:'Одноместный номер', accomodation:['1+0', '1+1'], price:{adult: 1000, children: 300} },
                                  {name:'Двухместный номер', accomodation:['2+0', '2+1','2+2'], price:{adult: 1500, children: 400} },
                                  {name:'Двухместный номер люкс', accomodation:['2+0', '2+1','2+2','3+0'], price:{adult: 1600, children: 500} }],
                        description: {
                            text:'санаторий Берестье (КУП «Брестагроздравница») расположен на территории курорта Белое озеро в Брестском районе. Санаторий находится в окружении массива сосново-лиственного леса уникального биосферного резервата и ландшафтного заказника «Прибужское Полесье». Территория санатория примыкает к озеру Рогознянское, которое соединяется каналом с озером Белое, Черное и далее Тайное. На территории санатория произрастают сосна, ель, береза, плодово-садовые деревья.',
                            fotos:['https://sanatorii.by/images/obj/89/c2598he5_433_true.jpg', 'http://belarus.svobodno.su/images/recovery/sanatoriy-bereste-0.jpg', 'https://i.ytimg.com/vi/h1TaZmN2waY/maxresdefault.jpg']
                        }}, 
                        room:{name:'Одноместный номер', accomodation:['1+0', '1+1'], price:{adult: 1000, children: 300} }, 
                        adults:1, 
                        children:0 }}


        let instance = mount(<BookingForm location={location} history={[]}/>)
        console.log (instance.debug())

        // expect(instance).toMatchSnapshot()
    })

  });
