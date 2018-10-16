"use strict"

const express = require('express')
const app = express()
const port = 8080

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.get('/', (req, res) => res.json(
    [
        {"_id" : "5b06859e5089ec123b9e668c",
         "type" : "санаторий",
         "name" : "Берестье",
         "region" : "Минская область",
         "stars" : 2},
         {"_id" : "5b06859e5089ec123b9e668f",
          "type" : "санаторий",
          "name" : "Белая вежа",
          "region" : "Минская область",
          "stars" : 3,},
          {"_id" : "5b06859e5089ec123b9e668d",
          "type" : "ДРОЦ",
          "name" : "Свитанак",
          "region" : "Витебская область",
          "stars" : 4,},
          {"_id" : "5b06859e5089ec123b9e668e",
          "type" : "санаторий",
          "name" : "Буг",
          "region" : "Минская область",
          "stars" : 4,}
      ]
))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))