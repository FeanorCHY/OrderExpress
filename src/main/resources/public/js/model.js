let $ = require('jquery');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;
let utils = require('./utils');
const default_img_path_without_suffix = "../img/user-default";

let Customer = Backbone.Model.extend({
    url: function () {
        let base = "/user";
        if (this.isNew()) {
            return base + "/register";
        }
        return utils.slash(base) + this.id;
    },
    default: {
        isLoggedIn: false
    },
    initialize: function () {
        // this.set("cus_email", "asd11@qq.com");
    },
    validationError: "",
    validate: function () {
        let self = this;
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
            id: customer.cus_id,
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
        res_delivery_time: "30,60",
        search_text: ""
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
        this.bindSearchText();
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
    bindSearchText: function () {
        let self = this,
            input = $("#restaurant-search-text"),
            button = input.parent().find("button");
        input.on("mouseup", function () {
            self.set("search_text", input.val());
        });
        button.click(function () {
            self.set("search_text", input.val());
        });
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
                self.model = model;
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

let UserTransactionModel = Backbone.Model.extend({
    parseBy: function (userTransactionObject) {
        let restaurants = userTransactionObject.restaurants,
            res_list = [];
        Object.keys(restaurants).forEach(function (res_id) {
            res_list.push(restaurants[res_id])
        });
        this.set({
            id: userTransactionObject.tran_id,
            url: "/transaction/" + userTransactionObject.tran_id,
            tran_id: userTransactionObject.tran_id,
            total_price: userTransactionObject.total_price,
            tran_date: new Date((new Date(0)).setUTCSeconds(userTransactionObject.tran_date / 1000)),
            res_list: res_list
        });
    },
    fetchData: function () {
        let self = this;
        $.when($.getJSON(self.get("url")).done(function (data) {
            let res_list = self.get("res_list"),
                trans_detail = data.trans_detail,
                restaurants = {};
            res_list.forEach(function (res_obj) {
                res_obj["dish_list"] = [];
                restaurants[res_obj.res_id] = res_obj;
            });
            trans_detail.forEach(function (dish_obj) {
                restaurants[dish_obj.res_id].dish_list.push({
                    dish_id: dish_obj.dish_id,
                    dish_name: dish_obj.dish_name,
                    quantity: dish_obj.quantity,
                    pic_path: dish_obj.pic_path
                });
            });
            let temp_list = [];
            Object.keys(restaurants).forEach(function (key) {
                temp_list.push(restaurants[key]);
            });
            self.set("res_list",temp_list);
            self.trigger("reload");
        }).fail(function (xhr, textStatus) {
            console.log(xhr.status);
        }));
    }
});

module.exports = {
    Customer: Customer,
    RestaurantFilterModel: RestaurantFilterModel,
    RestaurantModel: RestaurantModel,
    RestaurantTypeModel: RestaurantTypeModel,
    UserTransactionModel: UserTransactionModel,
    DishModel: DishModel
};