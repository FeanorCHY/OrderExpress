require('../css/style.css');
let $ = require("jquery");
window.$ = window.jQuery = $;
window.AdminLTEOptions = require('../config/AdminLTEOptions.js');
<!-- bootstrap datepicker -->
require("../lib/AdminLTE/plugins/datepicker/bootstrap-datepicker.js");
<!-- ion-rangeslider -->
require("ion-rangeslider");
<!-- InputMask -->
require("../lib/AdminLTE/plugins/input-mask/jquery.inputmask.js");
require("../lib/AdminLTE/plugins/input-mask/jquery.inputmask.phone.extensions.js");
let _ = require('underscore');
let View = require('./view.js');
let Model = require('./model.js');
let Collection = require('./collection.js');
let utils = require('./utils');
let _vars = require('!css-variables!../css/variables.css');

$(document).ready(function () {
    console.log(window.location.href);
    loadDOMElements();
    let customerModel = new Model.Customer();
    let customerBadgeView = new View.CustomerBadgeView({
        model: customerModel
    });
    customerBadgeView.render();
    customerModel.on("change", function () {
        if (customerModel.hasChanged("isLoggedIn")) {
            customerBadgeView.render();
        }
    });
    let loginMaskView = new View.LoginMaskView({
        model: customerModel
    });
    let registrationMaskView = new View.RegisterMaskView({
        model: customerModel
    });
    registrationMaskView.bindEvents();

    let restaurantFilterModel = new Model.RestaurantFilterModel();
    let restaurantTypeModel = new Model.RestaurantTypeModel();
    let restaurantTypeView = new View.RestaurantTypeView({
        model: restaurantTypeModel
    });
    restaurantTypeModel.on("change", function () {
        restaurantTypeView.render();
        restaurantFilterModel.bindEvents();
    });
    restaurantTypeModel.fetchData();

    let rsrCollection = new Collection.RestaurantSearchResultCollection();
    let rsrView = new View.RestaurantSearchResultView({
        model: rsrCollection
    });
    rsrCollection.on("change", function () {
        console.log("ye");
        rsrView.render();
    });
    restaurantFilterModel.on("change", function () {
        $("#restaurant-search-result").html(utils.ui.overlayIcon);
        restaurantFilterModel.preFetchValidation(restaurantTypeModel);
        console.log("y");
        rsrCollection.fetchData(restaurantFilterModel.attributes);
        rsrCollection.trigger("change");
    });

    $('#login-button').on("click", function () {
        loginMaskView.render();
    });
});

function loadDOMElements() {

    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });

    // Date picker
    $('#datepicker').datepicker({
        autoclose: true
    });

    // Phone mask
    $(":input").inputmask();

    // delivery-time-range
    $("#delivery-time-range").ionRangeSlider({
        min: 15,
        max: 120,
        from: 30,
        to: 60,
        step: 15,
        type: 'double',
        min_interval: 15,
        postfix: ' min.',
        grid: true,
        grid_num: 7,
        input_values_separator: ";"
    });

    // avg-price-range
    $("#avg-price-range").ionRangeSlider({
        min: 5,
        max: 105,
        from: 10,
        to: 30,
        step: 5,
        type: 'double',
        min_interval: 5,
        prefix: '$',
        grid: true,
        grid_num: 10,
        input_values_separator: ";"
    });

    // rating-range
    $("#rating-range").ionRangeSlider({
        min: 0,
        max: 5,
        from: 4,
        to: 5,
        step: 1,
        type: 'double',
        min_interval: 1,
        grid: false,
        input_values_separator: ";"
    });
    console.log("loaded.");
}


