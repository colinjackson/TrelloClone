TrelloClone.Views.ItemItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['items/_item'],

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var renderedContent = this.template({
      item: this.model
    });
    this.$el.html(renderedContent);

    return this;
  }
})
