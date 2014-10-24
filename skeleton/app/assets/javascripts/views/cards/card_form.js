TrelloClone.Views.CardForm = Backbone.View.extend({
  className: 'card-form',
  template: JST['cards/_form'],

  initialize: function (options) {
    this.superview = options.superview;
    this.formActive = false;
  },

  events: {
    'click': 'keepAlive',
    'click .show-card-form': 'showForm',
    'click button.save-card-form': 'saveCard',
    'click button.close-card-form': 'closeForm'
  },

  keepAlive: function (event) {
    event.stopPropagation();
  },

  render: function () {
    var renderedContent = this.template({
      card: this.model,
      formActive: this.formActive
    });
    this.$el.html(renderedContent);

    return this;
  },

  showForm: function (event) {
    this.superview.superview.dismissOtherForms(this);
    this.formActive = true;
    this.render();
    this.$('#card_title').focus();
  },

  saveCard: function (event) {
    event.preventDefault();

    var formData = this.$('form').serializeJSON();
    this.collection.create(formData, {
      success: function () {
        this.render();
        this.$('#card_title').focus();
      }.bind(this)
    });
  },

  closeForm: function () {
    event.preventDefault();

    this.formActive = false;
    this.render();
  }

});
