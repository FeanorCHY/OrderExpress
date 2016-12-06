let $ = require('jquery');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;
let utils = require('./utils');


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

let DishCollection = Backbone.Collection.extend({});

module.exports = {
    RestaurantSearchResultCollection: RestaurantSearchResultCollection,
    DishCollection: DishCollection
};