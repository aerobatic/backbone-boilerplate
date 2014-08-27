define(function(require, module) {
  var Backbone = require('backbone');
  var app = require('app');
  var Templates = require('tmp/templates');

  var IndexView = Backbone.View.extend({
    el: 'body',

    events: {
    },

    initialize: function() {
    },

    render: function() {
      var that = this;

      // Use the precompiled template rather than incurring a network
      // round-trip to load it.
      that.$el.html(Templates['app/templates/index.html']({
        cdnUrl: app.aerobatic.cdnUrl
      }));

      return this;
    }
  });

  return IndexView;
});
