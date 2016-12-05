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
            cus_phone: customer.cus_phone
        });
        this.setAvatar(default_img_path_without_suffix);
    },
    setAvatar: function (img_path) {
        this.set("cus_img", img_path);
    }
});

let RestaurantFilterModel = Backbone.Model.extend({
    defaults: {
        res_type: "",
        avg_price: "10,30",
        res_rating: "4,5",
        res_delivery_time: "30,60"
    },
    initialize: function () {

    },
    bindEvents: function () {
        let self = this;
        $(".checkbox.icheck label, .checkbox.icheck label div ins").map(function (idx, icheck) {
            icheck.addEventListener("click", function () {
                self.bindUpdateType();
            })
        });
        this.bindUpdateType();
        this.bindUpdateAvgPrice();
        this.bindUpdateRating();
        this.bindUpdateDeliveryTime();
    },
    bindUpdateType: function () {

        let tempResType = "";
        $("#restaurant-cuisine .icheckbox_square-blue").map(function (idx, element) {
            let e = $(element);
            if (e.hasClass("checked")) {
                tempResType += e.find("input").val() + ",";
            }
        });
        this.set("res_type", tempResType);
    },
    bindUpdateAvgPrice: function () {
        this.updateRange("avg_price", "#avg-price-range");
    },
    bindUpdateRating: function () {
        this.updateRange("res_rating", "#rating-range");
    },
    bindUpdateDeliveryTime: function () {
        this.updateRange("res_delivery_time", "#delivery-time-range");
    },
    updateRange: function (attribute, inputElement) {
        let self = this,
            input = $(inputElement),
            root = input.parent();
        root.find(".from, .irs-from, .to, .irs-to").map(function (idx, element) {
            element.addEventListener("mouseup", function () {
                self.set(attribute, input.val());
            });
        });
    },
    preFetchValidation: function (restaurantTypeModel) {
        if (this.get("res_type") === "") {
            this.set("res_type", Object.keys(restaurantTypeModel.attributes).join());
        }
    }
});

let RestaurantTypeModel = Backbone.Model.extend({
    url: function () {
        let base = "/search/cuisine";
        if (this.isNew()) {
            return base;
        }
        return utils.slash(base) + this.id;
    },
    fetchData: function () {
        let self = this;
        this.fetch({
            success: function (model, response, options) {
                this.model = model;
            },
            error: function (model, response, options) {
            }
        });
    }
});

let RestaurantModel = Backbone.Model.extend({
    url: "/restaurant",
    default: {},
    initialize: function () {
    },
    validate: function () {
    },
    parse: function () {
    }
});

let DishModel = Backbone.Model.extend({
    url: "/dish",
    default: {},
    initialize: function () {

    },
    validate: function () {

    },
    parse: function () {

    }
});

module.exports = {
    Customer: Customer,
    RestaurantFilterModel: RestaurantFilterModel,
    RestaurantModel: RestaurantModel,
    RestaurantTypeModel: RestaurantTypeModel,
    DishModel: DishModel
};