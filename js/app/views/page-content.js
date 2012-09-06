define(
    ['text!tpls/page-content.html'],
    function(tpl_pageContent){

        return Backbone.HandyView.extend({

            tagName: 'div',

            tpl: '',

            initialize:function () {
                this.tpl  = Handlebars.compile(tpl_pageContent);
            },

            render:function () {
                this.$el.html(
                    this.tpl(App.mPage.toJSON())
                );
                return this;
            }

        });

    });
