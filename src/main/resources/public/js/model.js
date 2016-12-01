let $ = require('jquery');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;
let utils = require('./utils');

let Customer = Backbone.Model.extend({
                                         url: "register",
                                         defaults: {
                                             cus_name: "user_" + (new Date()).getTime(),
                                             cus_password: (new Date()).getTime(),
                                             cus_gender: "male",
                                             cus_age: 1,
                                             cus_email: (new Date()).getTime() + "@test.com",
                                             cus_address: "135 N Bellefield Ave, Unit 403, Pittsburgh PA 15213",
                                             cus_phone: "4124121212"
                                         },
                                         initialize: function () {
                                             // this.set("cus_email", "asd11@qq.com");
                                         },
                                         validationError: "",
                                         validate: function () {
                                             let errMsg = "";
                                             if (!utils.emailValidate(this.attributes.cus_email)) {
                                                 errMsg = "invalid email.";
                                             } else if (!utils.ageValidate(
                                                     this.attributes.cus_age)) {
                                                 errMsg = "invalid age.";
                                             } else if (!utils.phoneValidate(
                                                     this.attributes.cus_phone)) {
                                                 errMsg = "invalid phone number.";
                                             } else if (!utils.genderValidate(
                                                     this.attributes.cus_gender)) {
                                                 errMsg = "invalid gender.";
                                             }
                                             if (errMsg !== "") {
                                                 this.validationError = errMsg;
                                                 return errMsg;
                                             }
                                         }
                                     }
);

module.exports = {
    Customer: Customer
};