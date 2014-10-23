TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
	template: JST['boards/index'],

	initialize: function () {
		this.listenTo(this.collection, "sync add remove", this.render)
	},

	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);

		var view = this;
		this.collection.each(function (board) {
			var subview = new TrelloClone.Views.BoardItem({
				model: board
			});
			view.addSubview("ul", subview);
		});

		return this;
	}
});