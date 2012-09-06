define(
    ['text!tpls/nav.html'],
    function(tpl_secondaryNav){

        return Backbone.HandyView.extend({

            tagName: 'ul',

            tpl: '',

            type: '',

            processedItems: [],



            initialize:function (options) {

                this.id = options && options.id ? options.id : '';
                this.className = options && options.className ? options.className : '';
                this.type = options && options.type ? options.type : null;


                this.tpl  = Handlebars.compile(tpl_secondaryNav);

                // Events
                this.bindToModel(App.mPage, 'change', this.render);
            },



            render:function () {
                this.$el.html(
                    this.tpl({
                        items:this.buildItems()
                    })
                );
                return this;
            },



            events:{
                'click a':'hGo'
            },



            hGo:function (e) {
                App.Router.navigate($(e.target).attr('href'), {trigger: true});
                return false;
            },



            getItemsSource: function(){
                switch (this.type) {
                    case 'primary' :
                        return App.nav.primary;

                    case 'secondary' :
                        var
                            topLevelItem = App.historyFragment[0],
                            sumItems = App.nav.primary[topLevelItem].items != undefined ? App.nav.primary[topLevelItem].items : null;
                        return sumItems;

                    default:
                        return {}
                }
            },



            buildItems: function() {

                this.processedItems = []

                var items = this.getItemsSource();

                if (items != null) {
                    _.each(items, function(value){
                        var classes = []
                        if (App.historyFragment.join('/').indexOf(value.url) === 0) classes.push('active');

                        this.processedItems.push({
                            url: value.url,
                            title: value.title,
                            classes: classes
                        });
                    }, this);
                }

                return this.processedItems;
            }

        });

    });
