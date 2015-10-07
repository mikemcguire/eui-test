// View.js
// -------
define(["jquery", 
    "backbone", 
    "models/ContactModel",
    "collections/ContactsCollection",
    "views/ContactItem",
    "views/ContactForm",
    "text!templates/contact.html"],

    function($, Backbone, ContactModel, Collection,  ContactItem, ContactForm, template){

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",

            // View constructor
            initialize: function() {

                //add the collection
                this.collection = new Collection()

                this.collection.on('add', this.addOne,this);

                // Calls the view's render method
                this.render()

            },

            // View Event Handlers
            events: {

            },

            addOne: function( model ){
                var view, newHTML,
                self = this
                view = new ContactItem({model: model, collection: this.collection })
                newHTML= ( view.render()).el
                self.$el.find(".contact-list").append( newHTML )

                return this
            },

            // Renders the view's template to the UI
            render: function() {
                var self = this

                // this.modelBinder.bind(this.model, this.el);
                
                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {})

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template)

                //add contact form and set it's collection.
                var form = new ContactForm({ el: this.$el.find(".contact-edit"), collection: this.collection })

                // Maintains chainability
                return this

            }

        })

        // Returns the View class
        return View

    }

)