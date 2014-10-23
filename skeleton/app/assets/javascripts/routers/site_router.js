TrelloClone.Routers.SiteRouter = Backbone.Router.extend({
	routes: {
		"": "boardsIndex"
	},

	boardsIndex: function () {
		var boards = TrelloClone.Collections.boards;
		var view = new TrelloClone.Views.BoardsIndex({
			collection: boards
		});

		boards.fetch();
		$('#main').html(view.render().$el);
	}
})