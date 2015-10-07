// View.js
// -------
define(["jquery", 
    "backbone",
    "views/ContactForm",
    "text!templates/contactitem.html"],

    function($, Backbone, ContactForm, template){

        var View = Backbone.View.extend({
            tagName : "li",
            className : "contact list-group-item",
            // View constructor
            initialize: function() {
                // Calls the view's render method
                this.render()
                

            },

            // View Event Handlers
            events: {
                "click .edit" : "displayForm",
                "click .delete" : "destroy"
            },

            displayForm: function(event){
                event.preventDefault()
                this.$el.find(".collapse").slideToggle()
            },
            destroy: function(event){
                event.preventDefault()
                this.model.destroy()
                this.remove()
            },

            // Renders the view's template to the UI
            render: function() {
                var self = this


                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, this.model.toJSON() )

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template)

                //add a contact form for editing and set it's model/collection
                var form = new ContactForm({ el: this.$el.find(".form"), collection : this.collection, model : this.model })

                // Maintains chainability
                return this

            }

        })

        // Returns the View class
        return View

    }

)