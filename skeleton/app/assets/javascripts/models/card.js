TrelloClone.Models.Card = Backbone.Model.extend({
	urlRoot: 'api/cards',

	parse: function (jsonResp) {
		if (jsonResp.items) {
			this._items.set(jsonResp.items, {parse: true});
			delete jsonResp.items;
		}

		return jsonResp;
	}

	items: function () {
		if (!this._items) {
			this._items = new TrelloClone.Collections.Items();
		}

		return this._items;
	}
})
