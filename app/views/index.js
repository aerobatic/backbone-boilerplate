define(function(require, module) {
  var Backbone = require('backbone');
  var app = require('app');

  var IndexView = Backbone.View.extend({
    el: 'body',
    // tagName: 'ul',
    // className: 'nav nav-list lists-nav',

    events: {
    },

    initialize: function() {
    },

    render: function() {
      var that = this;

      // You might want to compile your templates to JavaScript using
      // something like hogan. This demonstrates how to load them from
      // the CDN using the aerobatic.cdnUrl.
      $.get(app.aerobatic.cdnUrl + "/app/templates/index.html", function(template){
        var html = _.template(template, {
          cdnUrl: app.aerobatic.cdnUrl
        });

        that.$el.html(html);
      });
      return this;
    }
  });

  return IndexView;
});
