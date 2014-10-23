window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		new TrelloClone.Routers.SiteRouter();
		Backbone.history.start({pushState: true});
  }
};
