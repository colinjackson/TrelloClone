TrelloClone.Views.ListForm = Backbone.View.extend({
	tagName: 'form',
	template: JST['lists/_form'],

	initialize: function () {
		this.formActive = false;
	},

	events: {
		"click .show-list-form": "showForm",
		"click button": "saveModel"
	},

	render: function () {
		var renderedContent = this.template({
			list: this.model,
			formActive: this.formActive
		});
		this.$el.html(renderedContent);

		return this;
	},

	showForm: function (event) {
		this.formActive = true;
		this.render();
	},

	saveModel: function (event) {
		event.preventDefault();

		var formData = this.$el.serializeJSON();
		var board = TrelloClone.Collections.boards.get(this.model.get("board_id"));

		board.lists().create(formData, {
			success: function () {
				this.formActive = false;
				this.render();
			}.bind(this)
		});
	}
})