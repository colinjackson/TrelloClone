TrelloClone.Models.Board = Backbone.Model.extend({
	urlRoot: "api/boards",

	parse: function (jsonResp) {
		if (jsonResp.lists) {
			this.lists().set(jsonResp.lists, {parse: true});
			delete jsonResp.lists;
		}

		return jsonResp;
	},

	lists: function () {
		if (!this._lists) {
			this._lists = new TrelloClone.Collections.Lists();
		}

		return this._lists;
	}
});