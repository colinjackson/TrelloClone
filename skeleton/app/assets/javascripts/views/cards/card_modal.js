TrelloClone.Views.CardModal = Backbone.CompositeView.extend({
  className: 'card-modal modal-view',
  template: JST['cards/modal'],

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model.items(), 'add', this.addItem);
    this.listenTo(this.model.items(), 'remove', this.removeItem);
  },

  events: {
    'click button.dismiss-modal': 'remove'
  },

  render: function () {
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);

    return this.renderItems()
    // .renderNewItem();
  },

  renderItems: function () {
    this.subviews('ul.card-items').forEach(function (subview) {
      this.removeSubview('ul.card-items', subview);
    }.bind(this));

    this.model.items().each(function (item) {
      this.addItem(item);
    }.bind(this));

    return this;
  },

  renderNewItem: function () {
    this.subviews('div.new-item-form').forEach(function (subview) {
      this.removeSubview('div.new-item-form', subview);
    }.bind(this));

    var newItem = new TrelloClone.Models.Item({card_id: this.model.id});
    var subview = new TrelloClone.Views.ItemForm({
      superview: this,
      model: newItem,
      collection: this.model.items()
    });
    this.addSubview('div.new-item-form', subview);

    return this;
  },

  addItem: function (item) {
    var subview = new TrelloClone.Views.ItemItem({
      model: item
    });

    this.addSubview('ul.card-items', subview);
  },

  removeItem: function (item) {
    var subview = this.subviews('ul.card-items').filter(function (subview) {
      return subview.model === item;
    })[0];

    this.removeSubview('ul.card-items', subview);
  }
})
