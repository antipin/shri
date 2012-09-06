define(
    ['views/page-content'],
    function(cls_vPageContent){

        return Backbone.Router.extend({

            initialize: function() {
                // Add all routers from app.nav
                _.each(App.nav, function(menu){
                    this.loopNavRecourse(menu);
                }, this);
            },



            routes: {
                "": "routeIndex",
                "404": "route404"
            },



            routeIndex: function(){
                this.navigate("about-me", {trigger: true});
            },



            route404: function() {
                $('article#content').html(
                    '<div class="alert alert-error">' + "Страница не найдена =(" + '</div>'
                );
            },



            routerCallback: function() {

                var historyFragment = this.updateHistoryFragment();

                // Redirect to default tab if any
                if (
                        historyFragment.length == 1 &&                                  // If we are on tol level nav item
                        App.nav.primary[historyFragment[0]].items != undefined          // And this item has subitems
                    ) {
                    _.each(App.nav.primary[historyFragment[0]].items, function(value){
                        if (value.default) {
                            // Redirect to default tab
                            this.navigate(value.url, {trigger: true});
                        }
                    }, this);

                    return;
                }

                App.mPage.fetch({
                    success: function(model, response){

                        if (App.vPageContent !== undefined) {
                            App.vPageContent.$el.fadeOut(200,function(){
                                App.vPageContent.destroy();
                            });
                        }

                        setTimeout(function(){
                            App.vPageContent = new cls_vPageContent();

                            // Update page content
                            $('article#content').html(
                                App.vPageContent.render().el
                            );

                            App.spikeDOM();
                        },500);

                        // Update page title
                        $('title').html(
                            model.get('title') + App.settings.pageTitleDelimiter + App.settings.pageTitleSuffix
                        );



                    }
                });


            },



            loopNavRecourse: function() {

                var
                    items = arguments[0],
                    parentRouteFragment = arguments[1] != undefined ? arguments[1] + '/' : '';

                _.each(items, function(value, route) {

                    value.url = parentRouteFragment + route;

                    // Add router for item
                    this.route(value.url, 'routerCallback');

                    // Loop child items if any
                    if (value.items != undefined){
                        this.loopNavRecourse(value.items, route);
                    }

                }, this);
            },



            updateHistoryFragment: function() {
                // Store fragment as an array
                return App.historyFragment = Backbone.history.fragment.split('/');
            }


        });

    });
