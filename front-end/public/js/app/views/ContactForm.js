// View.js
// -------
define(["jquery", 
    "backbone",
    "models/ContactModel",
    "text!templates/contact-form.html"],

    function($, Backbone, ContactModel, template){

        var View = Backbone.View.extend({

            // View constructor
            initialize: function() {
                this.render()
                this.model = this.model && this.model.attributes ? this.model : new ContactModel()
                
            },

            // View Event Handlers
            events: {
                "change .country"   : "updateStates",
                "submit form"       : "save"
            },
            //update country on state/select
            updateStates: function(event){
                var self = this
                self.optgroups.hide().children().eq(0).prop("selected", true)
                self.$el.find(".state optgroup[label='" + $(event.target).find(':selected').html() + "']").show()
            },
            //save model to database
            save : function(event){
                event.preventDefault()
                var self = this
                var formArray = this.$el.find("form").serializeArray()
                //reduce will take many items and turn them to one
                // it's iterating function has two parameters
                //1. the object you are building
                //2. the field you are iterating over
                //underscore is awesome
                var formObject = _(formArray).reduce(function(objectOut, field) {
                  objectOut[field.name] = field.value;
                  return objectOut;
                }, {})

                //reset our form
                self.$el.find('form').trigger("reset")
                self.optgroups.hide()
                //save our data to the API
                self.model.save( formObject )
                //add it to our collection
                this.collection.add( this.model )
            },
            // Renders the view's template to the UI
            render: function() {
                var self = this,
                    model = this.model

                //only to json if you can tojson
                if( this.model && this.model.toJSON ){
                    model = this.model.toJSON()
                }
                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, model )

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template)

                //used to update states base on country select
                self.optgroups = self.$el.find(".state optgroup")
                self.optgroups.hide()

                // Maintains chainability
                return this

            }

        })

        // Returns the View class
        return View

    }

)