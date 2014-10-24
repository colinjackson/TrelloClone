TrelloClone.Routers.SiteRouter = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
		this.$modalEl = options.$modalEl;
		this.boards = TrelloClone.Collections.boards;
	},

	routes: {
		"": "boardsIndex",
		"boards/:id": "boardShow",
		"cards/:id": "cardShowModal"
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

	cardShowModal: function (id) {
		var card = new TrelloClone.Models.Card({id: id});
		card.fetch();
		var view = new TrelloClone.Views.CardModal({
			model: card
		});

		this._swapModal(view);
	},

	_swapView: function (view) {
		this._clearModal();

		this._currentView && this._currentView.remove();
		this.$rootEl.html(view.render().$el);
		this._currentView = view;
	},

	_swapModal: function (view) {
		this._clearModal();

		this.$modalEl.html(view.render().$el);
		this._currentModal = view;
	},

	_clearModal: function () {
		this.$_currentModal && this._currentModal.remove();
	}
})
