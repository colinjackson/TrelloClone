TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	template: JST['lists/show'],

	initialize: function () {
		this.listenTo(this.model, "change add remove", this.render);
		// this.listenTo(this.model.cards(), "add", this.addCard);
		// this.listenTo(this.model.cards(), "remove", this.removeCard);
	},

	events: {
		"click button.delete-list": "deleteList"
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

		var view = this
		this.model.cards().each(function (card) {
			var subview = new TrelloClone.Views.CardItem({
				model: card
			});

			view.addSubview('ul.list-cards', subview);
		});

		return this;
	},

	// renderCards: function () {
	//
	// },
	//
	// renderNewCard: function () {
	//
	// },
	//
	// addCard: function (card) {
	//
	// },
	//
	// removeCard: function (card) {
	//
	// },



});