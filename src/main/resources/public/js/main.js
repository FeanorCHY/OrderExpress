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
let Backbone = require('backbone');
Backbone.$ = $;
let View = require('./view.js');
let Model = require('./model.js');
let Collection = require('./collection.js');
let Router = require('./router.js');
let utils = require('./utils');
let _vars = require('!css-variables!../css/variables.css');

$(document).ready(function () {
    console.log(window.location.href);
    loadDOMElements();
    let AppRouter = new Router.AppRouter();
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
    let userTransactionView = new View.UserTransactionView();
    // userTransactionView.render();
    customerModel.on("change", function () {
        userBadgeView.render();
        if (customerModel.get("isLoggedIn")) {
            userProfileSummaryView.render();
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

    let rsrCollection = new Collection.RestaurantSearchResultCollection();
    let rsrView = new View.RestaurantSearchResultView({
        model: rsrCollection
    });
    rsrCollection.on("change", function () {
        rsrView.render();
        restaurantFilterModel.bindSearchText();
    });
    restaurantFilterModel.on("change", function () {
        $("#restaurant-search-table").html(utils.ui.overlayIcon);
        restaurantFilterModel.preFetchValidation(restaurantTypeModel);
        rsrCollection.fetchData(restaurantFilterModel.attributes);
    });

    $('#login-button').on("click", function () {
        loginMaskView.render();
    });

    AppRouter.on('route:profile', function (cus_id) {
        $("section.content-header").find("h1").html("Profile<small>And we deliver your favorite food!</small>");
        $("#home-left-panel").find(".box").hide();
        $("#home-right-panel").find(".box").hide();
        userProfileSummaryView.render();
        // userTransactionView.render();
        userProfileSummaryView.$el.show();
        userTransactionView.$el.show();
    });
    AppRouter.on('route:editProfile', function (cus_id) {
        $("section.content-header").find("h1").html("Profile<small>And we deliver your favorite food!</small>");
        $("#home-right-panel").find(".box").hide();
        userProfileSummaryView.render();
        userProfileView.render();
        userProfileView.$el.show();
    });
    AppRouter.on('route:home', function () {
        $("section.content-header").find("h1").html("Pick a Restaurant<small>And we deliver your favorite food!</small>");
        $("#home-left-panel").find(".box").hide();
        $("#home-right-panel").find(".box").hide();
        restaurantTypeModel.fetchData();
        restaurantTypeModel.on("change", function () {
            restaurantTypeView.render();
            restaurantFilterModel.bindEvents();
            rsrView.render();
            restaurantFilterModel.bindSearchText();
            restaurantTypeView.$el.show();
            rsrView.$el.show();
        });
    });
    Backbone.history.start();
    AppRouter.navigate("");
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


