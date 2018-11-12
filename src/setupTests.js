import $ from 'jquery';
global.$ = global.jQuery = $;

import Hammer from 'hammerjs'
global.Hammer = Hammer

global.Materialize = require ('./materialize.js')

$.prototype.material_select = jest.fn();
$.prototype.pickadate = jest.fn();
$.prototype.collapsible = jest.fn();
$.prototype.sideNav = jest.fn();

global.Materialize.toast = jest.fn();