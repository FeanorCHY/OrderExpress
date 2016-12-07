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
    let userBadgeView = new View.UserBadgeView({
        model: customerModel
    });
    let userProfileSummaryView = new View.UserProfileSummaryView({
        model: customerModel
    });
    let userProfileView = new View.UserProfileView({
        model: customerModel
    });
    customerModel.on("change", function () {
        if (customerModel.hasChanged("isLoggedIn")) {
            userBadgeView.render();
            if (customerModel.get("isLoggedIn")) {
                $("#user-profile-button").click(function () {
                    userProfileSummaryView.render();
                    userProfileView.bindTrigger();
                });
            }
        }
    });
    checkLogStatus(customerModel);
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
        rsrView.render();
    });
    restaurantFilterModel.on("change", function () {
        $("#restaurant-search-table").html(utils.ui.overlayIcon);
        restaurantFilterModel.preFetchValidation(restaurantTypeModel);
        rsrCollection.fetchData(restaurantFilterModel.attributes);
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

    console.log("loaded.");
}

function checkLogStatus(customerModel) {
    $.when($.getJSON("/logStatus")).done(function (data) {
        if (data.hasOwnProperty("customer")) {
            customerModel.parseWith(data.customer);
            customerModel.set("isLoggedIn", true);
        }
    });
}


