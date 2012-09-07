define(
    ['text!tpls/page-content.html'],
    function(tpl_pageContent){

        return Backbone.HandyView.extend({

            tagName: 'div',

            id: 'content-page',

            tpl: '',

            initialize:function () {
                this.tpl  = Handlebars.compile(tpl_pageContent);
            },

            render:function () {
                this.$el.html(this.tpl());
            },


            updateContent: function(data) {

                var self = this;

                this.$el.fadeOut(500, function(){
                    self.$el
                        .html(self.tpl(data))
                        .fadeIn();
                    App.spikeDOM();
                })

                return this;
            }

        });

    });
