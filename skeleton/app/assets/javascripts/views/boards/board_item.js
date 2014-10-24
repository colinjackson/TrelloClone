TrelloClone.Views.BoardItem = Backbone.View.extend({
	tagName: 'li',
	className: 'board-item',
	template: JST['boards/_item'],

	initialize: function () {
		this.listenTo(this.model, "change", this.render)
	},

	render: function () {
		var renderedContent = this.template({
			board: this.model
		});
		this.$el.html(renderedContent);

		return this;
	}
})
