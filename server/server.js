"use strict"

const express = require('express')
const app = express()
const port = 8080

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.listen(port, () => console.log(`server listening on port ${port}!`))

app.get('/', (req, res) => {
    
    setTimeout(function () {
        
        res.json(
            [
                {"_id" : "5b06859e5089ec123b9e668c",
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
                    }
                
                },
                 {"_id" : "5b06859e5089ec123b9e668f",
                  "type" : "санаторий",
                  "name" : "Белая вежа",
                  "region" : "Минская область",
                  "stars" : 3,
                  "rooms": [{name:'Одноместный номер с балконом', accomodation:['1+0', '1+1'], price:{adult: 1000, children: 300} },
                            {name:'Двухместный двухкомнаный номер', accomodation:['2+0', '2+1','2+2'], price:{adult: 1500, children: 400} },
                            {name:'Двухместный номер двухкомнаный номер люкс', accomodation:['2+0', '2+1','2+2','3+0'], price:{adult: 1600, children: 500} }]
                },
                  {"_id" : "5b06859e5089ec123b9e668d",
                  "type" : "ДРОЦ",
                  "name" : "Свитанак",
                  "region" : "Витебская область",
                  "stars" : 4,
                  "rooms": [{name:'Одноместный номер 1 корпус', accomodation:['1+0', '1+1'], price:{adult: 1000, children: 300} },
                            {name:'Двухместный номер 2 корпус', accomodation:['1+0','2+0', '2+1','2+2'], price:{adult: 1500, children: 400} },
                            {name:'Двухместный номер 3 корпус', accomodation:['2+0', '2+1','2+2','3+0'], price:{adult: 1600, children: 500} }]
                },
                  {"_id" : "5b06859e5089ec123b9e668e",
                  "type" : "санаторий",
                  "name" : "Буг",
                  "region" : "Минская область",
                  "stars" : 4,
                  "rooms": [{name:'Одноместный номер', accomodation:['1+0', '1+1', '1+2'], price:{adult: 1000, children: 300} },
                            {name:'Двухместный номер с террасой', accomodation:['1+1', '1+2' ,'2+0', '2+1','2+2', '3'], price:{adult: 1500, children: 400} },
                            {name:'Двухместный номер двухкомнатный люкс', accomodation:['2+0', '2+1','2+2','3+0', '3+1','3+2'], price:{adult: 1600, children: 500} }]}
              ]
        )
      }, 100)
    
    
    }

)


app.post('/neworder', function (req, res) {
    console.log('SERVER RECIVED NEW ORDER')
    console.log (req.body)
    res.send('Спасибо, завка получена')
  })


  app.post ('/contactmessage', (req,res)=>{
    console.log('SERVER RECIVED CONTACT PAGE MSG')
    console.log (req.body)
    res.send('Сообщение получено')
  })

  const orders2 = [{ hotel: 'Белая вежа',
  room: 'Двухместный номер двухкомнаный номер люкс',
  date: '22.11.2018',
  night: 17,
  adults: 1,
  children: 0,
  contactAdress: 'asd',
  contactTel: 'asd',
  touristsData: 
   [ { firstName: 'asd',
       lastName: 'asd',
       passSeries: 'asd',
       passNumber: 'asd',
       passValidTill: '25.11.2018' } ] },
       { hotel: 'Белая вежа',
       room: 'Двухместный номер двухкомнаный номер люкс',
       date: '22.11.2018',
       night: 17,
       adults: 1,
       children: 0,
       contactAdress: 'asd',
       contactTel: 'asd',
       touristsData: 
        [ { firstName: 'asd',
            lastName: 'asd',
            passSeries: 'asd',
            passNumber: 'asd',
            passValidTill: '25.11.2018' } ] }   
    
    ]

  const orders3 = [
    { hotel: 'Белая вежа',
    room: 'Двухместный номер двухкомнаный номер люкс',
    date: '22.11.2018',
    night: 17,
    adults: 1,
    children: 0,
    contactAdress: 'asd',
    contactTel: 'asd',
    touristsData: 
     [ { firstName: 'asd',
         lastName: 'asd',
         passSeries: 'asd',
         passNumber: 'asd',
         passValidTill: '25.11.2018' } ] },
         { hotel: 'Белая вежа',
  room: 'Двухместный номер двухкомнаный номер люкс',
  date: '22.11.2018',
  night: 17,
  adults: 1,
  children: 0,
  contactAdress: 'asd',
  contactTel: 'asd',
  touristsData: 
   [ { firstName: 'asd',
       lastName: 'asd',
       passSeries: 'asd',
       passNumber: 'asd',
       passValidTill: '25.11.2018' } ] },
       { hotel: 'Белая вежа',
  room: 'Двухместный номер двухкомнаный номер люкс',
  date: '22.11.2018',
  night: 17,
  adults: 1,
  children: 0,
  contactAdress: 'asd',
  contactTel: 'asd',
  touristsData: 
   [ { firstName: 'asd',
       lastName: 'asd',
       passSeries: 'asd',
       passNumber: 'asd',
       passValidTill: '25.11.2018' } ] }

]

  const users =[
    {email: '1' ,role: 'admin', pass: '1', orders: []},
    {email: '2' ,role: 'user', pass: '2', orders: orders2},
    {email: '3' ,role: 'user', pass: '3', orders : orders3},
    {email: '4' ,role: 'user', pass: '4', orders : []},


  ] 

  app.post ('/auth', (req,res)=>{

  console.log('SERVER SEND AUTH STATUS')
    
  let user = users.find(el=>el.email === req.body.email)
  let orders=[]
    if (user) {
       
        if (user.role === 'user') {
            console.log('USER ORDERS')
            orders = [...user.orders]
        } else {
            console.log("ADMIN ORDERS")
            users.forEach ((el)=>{
                 orders.push(el)
            })
            console.log(orders)
        }
        
        
        if (user.email ===req.body.email  && user.pass === req.body.pass){
            setTimeout (()=>{
                res.json ( {userName: user.email, authStatus: true, role: user.role, message: 'Есть пользователь', orders: orders})
            }, 1500)
    
        } else {
    
            setTimeout (()=>{
                res.json ( {authStatus: false, role: null, message: 'Проверьте имя пользователя и пароль'} )
            }, 700)
    
        }


    } else {
        setTimeout (()=>{
            res.json ( {authStatus: false, role: null, message: 'nouser'} )
        }, 700)
    }

  })

  app.post ('/signup', (req,res)=>{
   
    users.push ({email: req.body.email ,role: 'user', pass: req.body.password},)
    res.json ('Пользователь добавлен')

  })

