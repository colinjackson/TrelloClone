TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	template: JST['lists/show'],

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model.cards(), "sync add remove", this.render);
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
	}
});