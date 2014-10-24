TrelloClone.Views.CardItem = Backbone.View.extend({
	tagName: 'li',
	template: JST['cards/_item'],

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
	},

	events: {
		'click button.delete-card': 'deleteCard'
	},

	render: function () {
		var renderedContent = this.template({
			card: this.model
		});
		this.$el.html(renderedContent);

		return this;
	},

	deleteCard: function (event) {
		event.preventDefault();

		this.model.destroy();
	}
})
