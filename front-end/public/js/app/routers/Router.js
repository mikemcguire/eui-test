// DesktopRouter.js
// ----------------
define(["jquery", 
    "backbone",
    "views/View",
    "views/ContactPage"],

    function($, Backbone, View, ContactPage) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {
                $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
                    options.url = 'http://localhost:3000' + options.url;
                });
                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index",
                "contacts" : "contacts"

            },

            index: function() {

                // Instantiates a new view which will render the header text to the page
                new View();

            },

            contacts: function(){

                new ContactPage();
            }

        });

        // Returns the DesktopRouter class
        return DesktopRouter;

    }

);