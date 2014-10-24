window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		new TrelloClone.Routers.SiteRouter({
			$rootEl: $('#main'),
      $modalEl: $('#modal')
		});
		Backbone.history.start();
  }
};
