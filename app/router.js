define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  var IndexView = require('views/index');

  // Defining the application router.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      console.log("Welcome to your / route.");
      // var indexView = new IndexView();
      new IndexView().render();
    },

    detail: function() {
      console.log("Detail view");
    }
  });

  module.exports = Router;
});
