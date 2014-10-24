TrelloClone.Views.ListForm = Backbone.View.extend({
	template: JST['lists/_form'],

	initialize: function (options) {
		this.superview = options.superview;
		this.formActive = false;
	},

	events: {
		'click': 'keepAlive',
		'click .show-list-form': 'showForm',
		'click button.save-list-form': 'saveList',
		'click button.close-list-form': 'closeList'
	},

	keepAlive: function (event) {
		event.stopPropagation();
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
		this.superview.dismissOtherForms(this);
		this.formActive = true;
		this.render();
		this.$('#list_title').focus();
	},

	saveList: function (event) {
		event.preventDefault();

		var formData = this.$('form').serializeJSON();
		this.collection.create(formData, {
			success: function () {
				this.render();
				this.$('#list_title').focus();
			}.bind(this)
		});
	},

	closeList: function (event) {
		event.preventDefault();

		this.formActive = false;
		this.render();
	}
})
