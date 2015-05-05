var Analytics = require('analytics.js').constructor;
var integration = require('analytics.js-integration');
var tester = require('analytics.js-integration-tester');
var plugin = require('./');
var sandbox = require('clear-env');

describe('Interstate', function() {
  var Interstate = plugin;
  var interstate;
  var analytics;
  var options = {
    projectId: '123456789'
  };

  beforeEach(function() {
    analytics = new Analytics;
    interstate = new Interstate(options);
    analytics.use(plugin);
    analytics.use(tester);
    analytics.add(interstate);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    interstate.reset();
    sandbox();
  });

});
