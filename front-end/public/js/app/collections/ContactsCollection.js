// Collection.js
// -------------
define(["jquery","backbone","models/ContactModel"],

  function($, Backbone, ContactModel) {

    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({
    	urlRoot : "/contacts",
        url : function(){
            return this.urlRoot
        },
    	// Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
    	//model: ContactModel,
    	initialize: function(options) {
    	   this.fetch()
    	}
    });

    // Returns the Model class
    return Collection;

  }

);