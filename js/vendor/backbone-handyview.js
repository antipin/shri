/*!
 * backbone.handyview.js v0.6.0
 * Copyright 2012, Tim Branyen (@tbranyen)
 * backbone.layoutmanager.js may be freely distributed under the MIT license.

 */
(function(window) {

    "use strict";

    // Used to keep track of all LayoutManager key names.
    var keys;

    // Alias the libraries from the global object.
    var Backbone = window.Backbone;
    var _ = window._;
    var $ = window.$;

    // Creating a Backbone.View creates its initial element outside of the DOM,
    // if an existing element is not provided...
    var HandyView = Backbone.HandyView = function(options) {
        this.bindings = [];
        Backbone.View.apply(this, [options]);
    };

    _.extend(Backbone.HandyView.prototype, Backbone.View.prototype, {

        bindToModel: function (model, ev, callback) {
            model.bind(ev, callback, this);
            this.bindings.push({ model: model, ev: ev, callback: callback });
        },

        unbindFromAll: function () {
            _.each(this.bindings, function (binding) {
                binding.model.unbind(binding.ev, binding.callback);
            });
            this.bindings = [];
        },

        beforeDestroy: function() {},

        destroy: function () {

            //var type = this.viewType != undefined ? this.viewType : this.className;
            //console.log(type.toUpperCase() + ' is going to be DESTROIED. cid = ' + this.cid);

            this.beforeDestroy(); // Allow view perform some custom logic before destroy

            this.unbindFromAll(); // this will unbind all events that this view has bound to
            this.$el.removeData();
            this.unbind(); // this will unbind all listeners to events from this view. This is probably not necessary because this view will be garbage collected.
            this.undelegateEvents(); // Removes all of the view's delegated events. Useful if you want to disable or remove a view from the DOM temporarily.
            this.remove(); // uses the default Backbone.View.remove() method which removes this.el from the DOM and removes DOM events.
        }

    });

    Backbone.HandyView.extend = Backbone.View.extend;

})(this);