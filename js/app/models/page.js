define([], function( ){
    return  Backbone.Model.extend({

        defaults: function() {
            return {
                title: '',
                content: ''
            };
        },

        url: function() {
            return '/content/' + Backbone.history.fragment + '/page.json';
        },

        initialize: function() {}

    })
});