TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST['boards/show'],

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model.lists(), "sync add remove", this.render);
	},

	render: function () {
		var renderedContent = this.template({
			board: this.model
		});
		this.$el.html(renderedContent);

		var view = this;
		this.model.lists().each(function (list) {
			var subview = new TrelloClone.Views.ListShow({
				el: $('<li>'),
				model: list
			});

			view.addSubview('ul.board-lists', subview);
		});

		return this;
	}
})