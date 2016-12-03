let $ = require('jquery');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;
let utils = require('./utils');
const default_img_path_without_suffix = "../img/user-default";

let Customer = Backbone.Model.extend({
    url: "register",
    default: {
        isLoggedIn: false
    },
    initialize: function () {
        // this.set("cus_email", "asd11@qq.com");
    },
    validationError: "",
    validate: function () {
        var self = this;
        let errMsg = "";
        if (!utils.emailValidate(self.attributes.cus_email)) {
            errMsg = "invalid email.";
        } else if (!utils.ageValidate(self.attributes.cus_age)) {
            errMsg = "invalid age.";
        } else if (!utils.phoneValidate(self.attributes.cus_phone)) {
            errMsg = "invalid phone number.";
        } else if (!utils.genderValidate(self.attributes.cus_gender)) {
            errMsg = "invalid gender.";
        }
        if (errMsg !== "") {
            self.validationError = errMsg;
            return errMsg;
        }
    },
    parseWith: function (customer) {
        this.set({
            cus_id: customer.cus_id,
            cus_name: customer.cus_name,
            cus_password: customer.cus_password,
            cus_gender: customer.cus_gender,
            cus_age: customer.cus_age,
            cus_email: customer.cus_email,
            cus_address: customer.cus_address,
            cus_phone: customer.cus_phone,
        });
        this.setAvatar(default_img_path_without_suffix);
    },
    setAvatar: function (img_path) {
        this.set("cus_img", img_path);
    }
});

module.exports = {
    Customer: Customer
};