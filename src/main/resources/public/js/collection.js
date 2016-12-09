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
    fetchData: function (cus_id) {
        this.url = "/transaction/user/" + cus_id;
        let self = this;
        $.when($.get({
            url: self.url,
            dataType: 'json'
        })).done(function (data, textStatus, call) {
            if (call.status !== 204) {
                let models = [];
                Object.keys(data.transactions).forEach(function (tran_id) {
                    let model = new Model.UserTransactionModel();
                    model.parseBy(data.transactions[tran_id]);
                    models.push(model);
                });
                self.set(models, {reset: true});
                self.trigger("init");
            }
        }).fail(function (xhr, textStatus) {
            console.log(xhr);
        });
    }
});

let DishCollection = Backbone.Collection.extend({});

module.exports = {
    RestaurantSearchResultCollection: RestaurantSearchResultCollection,
    UserTransactionCollection: UserTransactionCollection,
    DishCollection: DishCollection
};