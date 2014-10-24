TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	template: JST['lists/show'],

	initialize: function (options) {
		this.superview = options.superview;

		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model.cards(), 'add', this.addCard);
		this.listenTo(this.model.cards(), 'remove', this.removeCard);
	},

	events: {
		'click button.delete-list': 'deleteList'
	},

	deleteList: function (event) {
		event.preventDefault();

		this.model.destroy();
	},

	render: function () {
		var renderedContent = this.template({
			list: this.model
		});
		this.$el.html(renderedContent);

		return this.renderCards().renderNewCard();
	},

	renderCards: function () {
		this.subviews('ul.list-cards').forEach(function (subview) {
			this.removeSubview('ul.list-cards', subview);
		});

		this.model.cards().each(function (card) {
			this.addCard(card);
		}.bind(this));

		return this;
	},

	renderNewCard: function () {
		this.subviews('div.new-card-form').forEach(function (subview) {
			this.removeSubview('div.new-card-form', subview);
		}.bind(this));

		var newCard = new TrelloClone.Models.Card({list_id: this.model.id});
		var subview = new TrelloClone.Views.CardForm({
			superview: this,
			model: newCard,
			collection: this.model.cards()
		});
		this.addSubview('div.new-card-form', subview);

		return this;
	},

	addCard: function (card) {
		var subview = new TrelloClone.Views.CardItem({
			model: card
		});

		this.addSubview('ul.list-cards', subview);
	},

	removeCard: function (card) {
		var subview = this.subviews('ul.list-cards').filter(function (subview) {
			return subview.model === card;
		})[0];

		this.removeSubview('ul.list-cards', subview);
	},

	dismissNewCardForm: function (event) {
		var cardForm = this.subviews('div.new-card-form')[0];

		if (cardForm.formActive) {
			cardForm.formActive = false;
			cardForm.render();
		}
	}

});
