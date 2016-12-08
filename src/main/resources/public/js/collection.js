let $ = require('jquery');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;
let utils = require('./utils.js');
let Model = require('./model.js');


let RestaurantSearchResultCollection = Backbone.Collection.extend({
    url: '/search/filter',
    fetchData: function (filterAttributes) {
        let self = this;
        $.when($.get({
            url: this.url,
            data: filterAttributes,
            dataType: 'json'
        })).done(function (data) {
            self.set(data.results, {reset: true});
            self.trigger("change");
        }).fail(function (xhr, textStatus) {
            console.log(xhr.status);
        });
    }
});

let UserTransactionCollection = Backbone.Collection.extend({
    url: "transaction/user/",
    fetchData: function (customer) {
        let self = this;
        this.url = this.url + customer.get("cus_id");
        $.when($.get({
            url: self.url,
            dataType: 'json'
        })).done(function (data) {
            console.log(data.trans_list);
            self.set(data.trans_list, {reset: true});
            self.trigger("change");
        }).fail(function (xhr, textStatus) {
            console.log(xhr.status);
        });
    }
});

let DishCollection = Backbone.Collection.extend({});

module.exports = {
    RestaurantSearchResultCollection: RestaurantSearchResultCollection,
    DishCollection: DishCollection
};