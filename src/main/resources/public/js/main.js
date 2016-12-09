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
    let userTransactionCollection = new Collection.UserTransactionCollection();
    let userBadgeView = new View.UserBadgeView({
        model: customerModel
    });
    let userProfileSummaryView = new View.UserProfileSummaryView({
        model: customerModel
    });
    let userProfileView = new View.UserProfileView({
        model: customerModel
    });
    let userTransactionView = new View.UserTransactionView({
        model: userTransactionCollection
    });
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

    document.getElementById("home-right-panel").addEventListener("click", function (e) {
        let target,
            targetIsBtn = e.target && e.target.nodeName === "BUTTON" && e.target.hasChildNodes()&& e.target.childNodes.nodeName==="I",
            targetIsIcon = e.target && e.target.className.split(" ")[1] === "fa-plus",
            theModel;
        if (targetIsBtn || targetIsIcon) {
            target = targetIsBtn ? $(e.target) : $(e.target).parent();
            theModel = userTransactionCollection.get(+target.attr("value"));
            theModel.on("reload",function () {
                console.log(theModel);
                let userTransactionDetailView = new View.UserTransactionDetailView({
                    model: theModel
                });
                userTransactionDetailView.render();
                console.log(userTransactionDetailView.$el.html());
            });
            theModel.fetchData();
        }
    });

    AppRouter.on('route:profile', function (cus_id) {
        utils.dom.switch_user_profile_heading();
        utils.dom.left_boxes.hide();
        utils.dom.right_boxes.hide();
        utils.dom.left_loading_box.show();
        utils.dom.right_loading_box.show();

        userProfileSummaryView.render();
        userTransactionCollection.fetchData(cus_id);
        userTransactionCollection.on("init", function () {
            userTransactionView.render();
            utils.dom.right_loading_box.hide();
            userTransactionView.$el.show();
            // $(".tran-expand-btn").click(function () {
            //     let self = this,
            //         theModel = userTransactionCollection.get(+$(self).attr("value"));
            //     theModel.fetchData();
            //     theModel.on("reload",function () {
            //         console.log(theModel);
            //         let userTransactionDetailView = new View.UserTransactionDetailView({
            //             model: theModel
            //         });
            //         userTransactionDetailView.$el.show("slow");
            //         userTransactionDetailView.render();
            //     });
            // })
        });
        utils.dom.left_loading_box.hide();
        userProfileSummaryView.$el.show();
    });
    AppRouter.on('route:editProfile', function (cus_id) {
        utils.dom.switch_user_profile_heading();
        utils.dom.right_boxes.hide();
        utils.dom.right_loading_box.show();

        userProfileSummaryView.render();
        userProfileView.render();

        utils.dom.right_loading_box.hide();
        userProfileView.$el.show();
    });
    AppRouter.on('route:home', function () {
        utils.dom.switch_home_heading();
        utils.dom.left_boxes.hide();
        utils.dom.right_boxes.hide();
        utils.dom.left_loading_box.show();
        utils.dom.right_loading_box.show();

        restaurantTypeModel.fetchData();
        restaurantTypeModel.on("change", function () {
            restaurantTypeView.render();
            restaurantFilterModel.bindEvents();
            rsrView.render();
            restaurantFilterModel.bindSearchText();

            utils.dom.left_loading_box.hide();
            utils.dom.right_loading_box.hide();
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


