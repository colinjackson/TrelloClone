TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	className: 'board-show',
	template: JST['boards/show'],

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model.lists(), "add", this.addList);
		this.listenTo(this.model.lists(), "remove", this.removeList);
	},

	events: {
		'click': 'dismissForms'
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
		this.subviews('div.new-list-form').forEach(function (subview) {
			this.removeSubview('div.new-list-form', subview);
		}.bind(this));

		var newList = new TrelloClone.Models.List({board_id: this.model.id});
		var subview = new TrelloClone.Views.ListForm({
			superview: this,
			model: newList,
			collection: this.model.lists()
		});
		this.addSubview('div.new-list-form', subview);

		return this;
	},

	addList: function (card) {
		var subview = new TrelloClone.Views.ListShow({
			el: $('<li>'),
			model: card,
			superview: this
		});
		this.addSubview('ul.board-lists', subview);
	},

	removeList: function (card) {
		var subview = this.subviews('ul.board-lists').filter(function (subviewEl) {
			return subviewEl.model === card;
		})[0];

		this.removeSubview('ul.board-lists', subview);
	},

	dismissForms: function () {
		this.dismissOtherForms();
	},

	dismissOtherForms: function (currentForm) {
		forms = [];
		forms.push(this.subviews('div.new-list-form')[0]);

		this.subviews('ul.board-lists').forEach(function (listSubview) {
			forms.push(listSubview.subviews('div.new-card-form')[0]);
		});

		forms.forEach(function (form) {
			if (form.formActive && form !== currentForm) {
				form.formActive = false;
				form.render();
			}
		});
	}
});
