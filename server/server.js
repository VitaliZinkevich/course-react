"use strict"

const express = require("express")
const app = express()
const port = 8080
var moment = require("moment");

let session = require("express-session")
let bodyParser = require("body-parser")

app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
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



const orders2 = [
    { number: 6370,
        hotel: "Буг",
        room: "Одноместный ",
        date: "22.11.2018",
        night: 20,
        adults: 1,
        "children": 0,
        contactAdress: "Минск",
        contactTel: "375291234567",
        touristsData: 
         [ { firstName: "Петр",
             lastName: "Петров",
             passSeries: "МР",
             passNumber: "1234567",
             passValidTill: "23.11.2025" } ],
        statusConfirmed: 1,
        statusPayment: 1,
        "price":10000,
        paymentPart: 0,
        dateOfCreation: "2016-10-30T10:43:48.121Z",
        orderCreatorEmail: "2", },
        { number: 8518,
            hotel: "Буг",
            room: "Двухместный  двухкомнатный люкс",
            date: "23.11.2018",
            night: 20,
            adults: 1,
            "children": 0,
            contactAdress: "Могилев",
            contactTel: "375331112233",
            touristsData: 
             [ { firstName: "Сидор",
                 lastName: "Сидоров",
                 passSeries: "КН",
                 passNumber: "7777777",
                 passValidTill: "30.11.2030" } ],
            statusConfirmed: 1,
            statusPayment: 1,
            "price":30000,
            paymentPart: 0,
            dateOfCreation: "2018-11-29T10:43:48.121Z",
            orderCreatorEmail: "2", },
            { number: 5252,
                hotel: "Белая вежа",
                room: "Двухместный двухкомнаный ",
                date: "21.11.2018",
                night: 20,
                adults: 2,
                "children": 2,
                contactAdress: "Москва",
                contactTel: "74951112233",
                touristsData: 
                 [ { firstName: "Иван",
                     lastName: "Иванов",
                     passSeries: "53",
                     passNumber: "1112233",
                     passValidTill: "24.11.2060" },
                   { firstName: "Петр",
                     lastName: "Петров",
                     passSeries: "53",
                     passNumber: "4455566",
                     passValidTill: "24.11.2060" },
                   { firstName: "Lorem",
                     lastName: "Ipsum",
                     passSeries: "22",
                     passNumber: "1189898",
                     passValidTill: "30.11.2026" },
                   { firstName: "Ipsum",
                     lastName: "Ipsum",
                     passSeries: "99",
                     passNumber: "1234568",
                     passValidTill: "24.11.2100" } ],
                statusConfirmed: 1,
                statusPayment: 1,
                "price":10500,
                paymentPart: 0,
                dateOfCreation: "2017-11-20T10:43:48.121Z",
                orderCreatorEmail: "2", }
                      
          
      
    ]

const orders3 = [
    { number: 6491,
        hotel: "Свитанак",
        room: "Двухместный  2 корпус",
        date: "30.11.2018",
        night: 1,
        adults: 2,
        "children": 1,
        contactAdress: "Минск",
        contactTel: "3752933333333",
        touristsData: 
         [ { firstName: "Lorem",
             lastName: "Lorem",
             passSeries: "МР",
             passNumber: "1234567",
             passValidTill: "23.11.2025" },
           { firstName: "Вася",
             lastName: "Васильев",
             passSeries: "МС",
             passNumber: "1235487",
             passValidTill: "24.11.2020" },
           { firstName: "Сережа",
             lastName: "Сергев",
             passSeries: "РР",
             passNumber: "1234567",
             passValidTill: "24.11.2055" } ],
        statusConfirmed: 1,
        statusPayment: 1,
        "price":35000,
        dateOfCreation: "2018-11-26T10:43:48.121Z",
        orderCreatorEmail: "3",
        paymentPart: 0 },
        { number: 6007,
            hotel: "Свитанак",
            room: "Двухместный  2 корпус",
            date: "30.11.2018",
            night: 1,
            adults: 2,
            "children": 1,
            contactAdress: "Брест",
            contactTel: "3756699887",
            touristsData: 
             [ { firstName: "Саша",
                 lastName: "Иванов",
                 passSeries: "АВ",
                 passNumber: "7894561",
                 passValidTill: "23.11.2030" },
               { firstName: "Петя",
                 lastName: "Петров",
                 passSeries: "АВ",
                 passNumber: "1234567",
                 passValidTill: "24.11.2019" },
               { firstName: "Боря",
                 lastName: "Борисов",
                 passSeries: "ВМ",
                 passNumber: "7894561",
                 passValidTill: "24.11.2080" } ],
            statusConfirmed: 1,
            statusPayment: 1,
            "price": 70000,
            paymentPart: 0,
            dateOfCreation: "2017-11-30T10:43:48.121Z",
            orderCreatorEmail: "3", },
           
]

const users =[
    {email: "1" ,role: "admin", pass: "1", orders: []},
    {email: "2" ,role: "user", pass: "2", orders: orders2},
    {email: "3" ,role: "user", pass: "3", orders : orders3},
    {email: "4" ,role: "user", pass: "4", orders : []},
  ] 

 // done
  app.get("/", (req, res) => {
   
    setTimeout(function () {
        
        res.json(
            [
                {"_id" : "5b06859e5089ec123b9e668c",
                    "type" : "санаторий",
                    "name" : "Берестье",
                    "region" : "Минская область",
                    "stars" : 2,
                    "rooms": [{"name":"Одноместный", "accomodation":["1+0", "1+1"], "price":{"adult": 1000, "children": 300} },
                              {"name":"Двухместный", "accomodation":["2+0", "2+1","2+2"], "price":{"adult": 1500, "children": 400} },
                              {"name":"Двухместный люкс", "accomodation":["2+0", "2+1","2+2","3+0"], "price":{"adult": 1600, "children": 500} }],
                    "description": {
                        "text":"санаторий Берестье (КУП «Брестагроздравница») расположен на территории курорта Белое озеро в Брестском районе. Санаторий находится в окружении массива сосново-лиственного леса уникального биосферного резервата и ландшафтного заказника «Прибужское Полесье». Территория санатория примыкает к озеру Рогознянское, которое соединяется каналом с озером Белое, Черное и далее Тайное. На территории санатория произрастают сосна, ель, береза, плодово-садовые деревья.",
                        "fotos":["https://sanatorii.by/images/obj/89/c2598he5_433_true.jpg", "http://belarus.svobodno.su/images/recovery/sanatoriy-bereste-0.jpg", "https://i.ytimg.com/vi/h1TaZmN2waY/maxresdefault.jpg"]
                    }
                
                },
                 {"_id" : "5b06859e5089ec123b9e668f",
                  "type" : "санаторий",
                  "name" : "Белая вежа",
                  "region" : "Минская область",
                  "stars" : 3,
                  "rooms": [{"name":"Одноместный  с балконом", "accomodation":["1+0", "1+1"], "price":{"adult": 1000, "children": 300} },
                            {"name":"Двухместный двухкомнаный ", "accomodation":["2+0", "2+1","2+2"], "price":{"adult": 1500, "children": 400} },
                            {"name":"Двухместный  двухкомнаный  люкс", "accomodation":["2+0", "2+1","2+2","3+0"], "price":{"adult": 1600, "children": 500} }]
                },
                  {"_id" : "5b06859e5089ec123b9e668d",
                  "type" : "ДРОЦ",
                  "name" : "Свитанак",
                  "region" : "Витебская область",
                  "stars" : 4,
                  "rooms": [{"name":"Одноместный  1 корпус", "accomodation":["1+0", "1+1"], "price":{"adult": 1000, "children": 300} },
                            {"name":"Двухместный  2 корпус", "accomodation":["1+0","2+0", "2+1","2+2"], "price":{"adult": 1500, "children": 400} },
                            {"name":"Двухместный  3 корпус", "accomodation":["2+0", "2+1","2+2","3+0"], "price":{"adult": 1600, "children": 500} }]
                },
                  {"_id" : "5b06859e5089ec123b9e668e",
                  "type" : "санаторий",
                  "name" : "Буг",
                  "region" : "Минская область",
                  "stars" : 4,
                  "rooms": [{"name":"Одноместный ", "accomodation":["1+0", "1+1", "1+2"], "price":{"adult": 1000, "children": 300} },
                            {"name":"Двухместный  с террасой", "accomodation":["1+1", "1+2" ,"2+0", "2+1","2+2", "3"], "price":{"adult": 1500, "children": 400} },
                            {"name":"Двухместный  двухкомнатный люкс", "accomodation":["2+0", "2+1","2+2","3+0", "3+1","3+2"], "price":{"adult": 1600, "children": 500} }]}
              ]
        )
      }, 1500)
  })

  // done
  app.post("/neworder", function (req, res) {
    // console.log("SERVER RECIVED NEW ORDER")
     // console.log(req.body)
    users.forEach((el)=>{
        if (el.email === req.session.user) {
            el.orders.push(req.body)
        }
    })
    res.send("Спасибо, завка получена")
  })

  
  app.post ("/contactmessage", (req,res)=>{
    // console.log("SERVER RECIVED CONTACT PAGE MSG")
    // console.log (req.body)
    res.send("Сообщение получено")
  })

  app.post ("/auth", (req,res)=>{

  //console.log("SERVER SEND AUTH STATUS")
  
  let user = users.find(el=>el.email === req.body.email)
  let orders=[]
    if (user) {
       
        if (user.role === "user") {
          //console.log(orders)
            orders = [...user.orders].sort ((a,b)=>{
                return moment(a.dateOfCreation).isBefore(b.dateOfCreation)})
                
        } else { // admin
            users.forEach ((el)=>{
            orders = orders.concat(el.orders)
            })
            orders = orders.sort ((a,b)=>{
                return moment(a.dateOfCreation).isBefore(b.dateOfCreation)})
           
        }
        
        
        if (user.email === req.body.email  && user.pass === req.body.pass){
            req.session.user = user.email
            setTimeout (()=>{
                res.json ( {userName: user.email, authStatus: true, role: user.role, message: "Есть пользователь", orders: orders})
            }, 1500)
    
        } else {
    
            setTimeout (()=>{
                res.json ( {authStatus: false, role: null, message: "Проверьте имя пользователя и пароль"} )
            }, 700)
    
        }


    } else {
        setTimeout (()=>{
            res.json ( {authStatus: false, role: null, message: "Нет такого пользователя"} )
        }, 700)
    }

  })

  app.post ("/signup", (req,res)=>{
    let haveUser = users.filter(el=>el.email === req.body.email)
    //console.log("SERVER RECIEVED NEW USER")
    //console.log(haveUser)
    if (haveUser.length !== 0) {
        res.send("Такой пользователь есть")
    } else {
        users.push ({email: req.body.email ,role: "user", pass: req.body.password, orders: []},)
        req.session.user = req.body.email
        res.send("Пользователь зарегистрирован")
    }
    
    

  })

  app.post ("/ordersChange", (req, res)=>{
      
        let changeArray = req.body.changes
        changeArray.forEach ((el)=>{
            users.forEach ((elemU)=>{
                elemU.orders.forEach((elemUO)=>{
                    if (el.orderNumber === elemUO.number) {

                        if (el.orderStatus === "paymentPart") {
                            // console.log(elemUO[el.orderStatus])
                            // console.log(el.statusValue)


                            elemUO[el.orderStatus]+=parseInt(el.statusValue)
                            
                        } else {
                        //    elemUO[el.orderStatus]=parseInt(el.statusValue)

                        //    console.log( (el.orderStatus === "statusPayment" && el.statusValue === 2))
                        //    console.log(el.orderStatus === "statusPayment")
                        //    console.log(parseInt (el.statusValue) === 2)

                            if (el.orderStatus === "statusPayment" && parseInt (el.statusValue) === 2) {
                                elemUO[el.orderStatus]=parseInt(el.statusValue)
                                //console.log("FULL PAYMENT")
                                elemUO.paymentPart = elemUO."price"

                            } else {
                               elemUO[el.orderStatus]=parseInt(el.statusValue)
                            }
                            
                        }

                        
                        
                        //console.log(elemUO[el.orderStatus])
                    }
                })
            })
        })

        res.send (true)
  })

  app.get ("/reneworders", (req,res)=>{

   if (req.session.user) {
    //    console.log("GOT USER AT RENEWORDERS")
    let currentUser = users.find(el=>el.email === req.session.user)
    if (currentUser.role === "admin") {
        // console.log("RENEW AFTER CHANGE ADMIN")
        let orders=[]
        users.forEach ((el)=>{
            orders = orders.concat(el.orders)
            })
        orders = orders.sort ((a,b)=>{
            return moment(a.dateOfCreation).isBefore(b.dateOfCreation)
            })

            res.json(orders)

    }  else {

        users.forEach((el)=>{
            if (el.email === req.session.user){
                // console.log("SEND NEW ORDERS")
                let orders = el.orders.sort ((a,b)=>{
                    return moment(a.dateOfCreation).isBefore(b.dateOfCreation)
                })
             res.json(orders)
            }
        })
    }     

       
    
   } else {
    // console.log("NO USER AT RENEWORDERS")
    res.json([])
   }
  })

  