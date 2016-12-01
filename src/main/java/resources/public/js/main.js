require('../css/style.css');
let $ = require("jquery");
window.$ = window.jQuery = $;
window.AdminLTEOptions = require('../config/AdminLTEOptions.js');
let _ = require('underscore');
let View = require('./view.js');
let Model = require('./model.js');
let utils = require('./utils.js');

$(document).ready(function () {
    console.log("page loaded.");
});

$('#register-button').on("click", function () {
    let user = new Model.User();
    user.save();
    // loginCheck(user);
});

function loginCheck(user) {
    console.log(utils.emailValidate(user.email));
}

function isLoggedIn() {
    return false;
}
