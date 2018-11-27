"Booking App" курсовой проэкт Виталия Зинкевича по курсу FD3 IT-academy<br/>
"Booking App" is final project by Vitali Zinkekevich for FD3 course at IT-academy

Приложение для бронирования проживания. Предпологается, что пользователь понимает куда попал и ему предлагают узнать сколько будет стоить иммено его персональный вариант. <br/>
This is app for hotel booking. Assumed, that user fully understands where he or she is. And user goes to find out how much will be cost desirable hotel booking for his dates and nights duration.

## Установка/ Install

git clone https://github.com/VitaliZinkevich/course-react.git bookingAppZinkevich<br/>
cd bookingAppZinkevich<br/>
npm install<br/>
cd server<br/>
npm install<br/>

## Конфигурация/ Set up

Скопировать файлы Navbar.js (./src/components/layout/Navbar.js)<br/> и NavItem.js (./src/components/layout/NavItem.js)<br/> в установленный пакет react-materialize в ./node_modules/react-materialize/lib заменив файлы пакета.<br/>

Copy files <br/>
Navbar.js (./src/components/layout/Navbar.js)<br/>
NavItem.js (./src/components/layout/NavItem.js)<br/>
to ./node_modules/react-materialize/lib with replacing original library files<br/>

Для корректной работы DOM валидатора с тегом "a" в пакете react-materialize и компонентом Link <br/>

This is for correct DOM validation work with a tag and Link component<br/>


## Старт/ Start

npm start из ./server запуск backend<br/>
npm start из ./ запуск frontend <br/>

npm start from ./server to start backend<br/>
npm start from ./ to start frontend <br/>

## Тесты/ Tests

npm test из ./<br/>

npm test from ./<br/>

