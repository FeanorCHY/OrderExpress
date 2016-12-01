require('../css/style.css');
let $ = require("jquery");
window.$ = window.jQuery = $;
window.AdminLTEOptions = require('../config/AdminLTEOptions.js');
let _ = require('underscore');
let View = require('./view');
let Model = require('./model');
let utils = require('./utils');

$(document).ready(function () {
    console.log("page loaded.");
});

$('#register-button').on("click", function () {
    let customer = new Model.Customer();
    customer.save(null, {
        success: function (mod, res, opts) {
            console.log(res);
        },
        error: function (mod, xhr, opts) {
            if (xhr.status === 409) {
                console.log("email taken.");
            }
        }
    });
    // loginCheck(user);
});

function loginCheck(user) {
    console.log(utils.emailValidate(user.email));
}

function isLoggedIn() {
    return false;
}
