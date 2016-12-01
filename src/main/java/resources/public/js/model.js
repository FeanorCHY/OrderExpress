let $ = require('jquery');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;
let utils = require('./utils');

let User = Backbone.Model.extend({
                                     url: "/register",
                                     defaults: {
                                         cus_id: "",
                                         cus_name: "user_" + (new Date()).getTime(),
                                         cus_password: (new Date()).getTime(),
                                         cus_gender: "male",
                                         cus_age: 0,
                                         cus_email: (new Date()).getTime().concat("@test.com"),
                                         cus_address: "135 N Bellefield Ave, Unit 403, Pittsburgh PA  15213",
                                         cus_phone: "4124121212"
                                     },
                                     validate: function () {
                                         if (!utils.emailValidate(this.cus_email)) {
                                             return "invalid email.";
                                         } else if (!utils.ageValidate(this.cus_age)) {
                                             return "invalid age.";
                                         } else if (!utils.phoneValidate(this.cus_phone)) {
                                             return "invalid phone number.";
                                         } else if (!utils.genderValidate(this.cus_gender)) {
                                             return "invalid gender.";
                                         }
                                     }
                                 }
);

module.exports = {
    User: User
};