let $ = require('jquery');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

let AppRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        "user/:cus_id": "profile",
        "user/:cus_id/edit": "editProfile",
        "transaction/user/:cus_id": "fetchTransListByCusId"
    },
    initialize:function () {

    }
});

module.exports = {
    AppRouter: AppRouter
};