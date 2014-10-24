TrelloClone.Views.CardItem = Backbone.View.extend({
	tagName: 'li',
	className: 'card-item',
	template: JST['cards/_item'],

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
	},

	events: {
		'click a.display-modal': 'displayModal',
		'click button.delete-card': 'deleteCard'
	},

	render: function () {
		var renderedContent = this.template({
			card: this.model
		});
		this.$el.html(renderedContent);

		return this;
	},

	displayModal: function (event) {
		event.preventDefault();

		var fragment = "cards/" + this.model.id;
		Backbone.history.navigate(fragment, {trigger: true});
	},

	deleteCard: function (event) {
		event.preventDefault();

		this.model.destroy();
	}
})
