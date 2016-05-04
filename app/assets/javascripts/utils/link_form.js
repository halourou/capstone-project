Backbone.LinkFormView = Backbone.View.extend({
  formShowing: false,

  events: {
    "click a": "showForm", // click a link, show the form
    "click .close": "hideForm", //click close class, hide the form
    "submit": "create", //create is and underscore collection method... will be defined specifically in views using LinkFormView
    "keydown textarea": "maybeCreate" //allows creation based on pressing enter, keycode 13
  },

  render: function () {
    var content;
    if (this.formShowing) {
      content = this.formTemplate();
    } else {
      content = this.linkTemplate();
    }

    this.$el.html(content);
    this.delegateEvents(); //binds events hash to right place (I like 80% understand this, revisit)
    return this;
  },

  hideForm: function () {
    this.formShowing = false;
    this.render();
  },

  maybeCreate: function(event) {
    if (event.keyCode === 13) {
      this.create(event);
    }
  },

  showForm: function (event) {
    event.preventDefault();
    this.formShowing = true;
    this.render();
    this.$('input').focus();
  }
});