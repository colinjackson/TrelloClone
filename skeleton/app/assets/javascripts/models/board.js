TrelloClone.Models.Board = Backbone.Model.extend({
	urlRoot: "api/boards",
	initialize: function (options) {
		this.title = options.title
	}
});