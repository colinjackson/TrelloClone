TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST['boards/show'],

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model.lists(), "add", this.addList);
		this.listenTo(this.model.lists(), "remove", this.removeList);
	},

	events: {
		'click :not(#new-list-form, #new-list-form *)': 'deactivateForm'
	},

	render: function () {
		var renderedContent = this.template({
			board: this.model
		});
		this.$el.html(renderedContent);

		return this.renderLists().renderNewList();
	},

	renderLists: function () {
		this.subviews('ul.board-lists').forEach(function (subview) {
			this.removeSubview('ul.board-lists', subview);
		}.bind(this));

		var view = this;
		this.model.lists().each(function (list) {
			this.addList(list);
		}.bind(this));

		return this;
	},

	renderNewList: function () {
		this.subviews('div#new-list-form').forEach(function (subview) {
			this.removeSubview('div#new-list-form', subview);
		}.bind(this));

		var newList = new TrelloClone.Models.List({board_id: this.model.id});
		var subview = new TrelloClone.Views.ListForm({
			model: newList
		});
		this.addSubview('div#new-list-form', subview);

		return this;
	},

	addList: function (model) {
		var subview = new TrelloClone.Views.ListShow({
			el: $('<li>'),
			model: model
		});
		this.addSubview('ul.board-lists', subview);
	},

	removeList: function (model) {
		var subview = this.subviews('ul.board-lists').filter(function (subviewEl) {
			return subviewEl.model === model;
		})[0];

		this.removeSubview('ul.board-lists', subview);
	},

	deactivateForm: function (event) {
		var formSubview = this.subviews('div#new-list-form')[0];
		if (formSubview) {
			formSubview.formActive = false;
			formSubview.render();
		}
	}
});