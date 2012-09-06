/* ---------------------------------------- Requirejs configuration ---------------------------------------- */

require.config({

    baseUrl: '/js/app',

    paths: {
        'text':    '../vendor/require-text'       // Text plugin
    }

});



/* ---------------------------------------- App init ---------------------------------------- */

var App = App || {}

require(
    ['app'],
    function(app) {
        $(function(){
            App = _.extend(app, App);
            App.initialize();
        });
    });