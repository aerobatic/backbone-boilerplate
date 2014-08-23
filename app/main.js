// Kick off the application.
require(["app", "router", "underscore"], function(app, Router, _) {
  // Use mustache style interpolate delimiters
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  app.router = new Router();

  // Place the __config__ global object that the Aerobatic platform
  // injects into the head on the app for easy access in any module.
  app.aerobatic = window.__config__;

  // Trigger the initial route and enable HTML5 History API support, set the
  // root folder to '/' by default.  Change in app.js.
  Backbone.history.start({ pushState: true, root: app.root });
});
