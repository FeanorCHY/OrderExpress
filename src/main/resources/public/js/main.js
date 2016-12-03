require('../css/style.css');
let $ = require("jquery");
window.$ = window.jQuery = $;
window.AdminLTEOptions = require('../config/AdminLTEOptions.js');
<!-- bootstrap datepicker -->
require("../lib/AdminLTE/plugins/datepicker/bootstrap-datepicker.js");
<!-- InputMask -->
require("../lib/AdminLTE/plugins/input-mask/jquery.inputmask.js");
require("../lib/AdminLTE/plugins/input-mask/jquery.inputmask.phone.extensions.js");
let _ = require('underscore');
let View = require('./view.js');
let Model = require('./model.js');
let utils = require('./utils');
let _vars = require('!css-variables!../css/variables.css');

$(document).ready(function () {
    loadDom();
    console.log("loaded.");
    let customerModel = new Model.Customer();
    let customerBadgeView = new View.CustomerBadgeView({
        model: customerModel
    });
    customerBadgeView.render();
    let loginMaskView = new View.LoginMaskView({
        model: customerModel
    });
    let registrationMaskView = new View.RegisterMaskView({
        model: customerModel
    });
    $('#login-button').on("click", function () {
        loginMaskView.render();
    });
    customerModel.on("change",function () {
        if(customerModel.hasChanged("isLoggedIn")){
            customerBadgeView.render();
        }
    });

});
function loadDom() {
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
}


