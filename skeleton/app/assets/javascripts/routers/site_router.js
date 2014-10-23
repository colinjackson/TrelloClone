TrelloClone.Routers.SiteRouter = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
		this.boards = TrelloClone.Collections.boards;
	},

	routes: {
		"": "boardsIndex",
		"boards/:id": "boardShow"
	},

	boardsIndex: function () {
		var view = new TrelloClone.Views.BoardsIndex({
			collection: this.boards
		});

		this.boards.fetch();
		this._swapView(view);
	},

	boardShow: function (id) {
		var board = this.boards.getOrFetch(id);
		var view = new TrelloClone.Views.BoardShow({
			model: board
		});

		this._swapView(view);
	},

	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this.$rootEl.html(view.render().$el);
		this._currentView = view;
	}
})