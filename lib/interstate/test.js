var Analytics = require('analytics.js').constructor;
var integration = require('analytics.js-integration');
var tester = require('analytics.js-integration-tester');
var plugin = require('./');
var sandbox = require('clear-env');

describe('Interstate', function(){
  var Interstate = plugin;
  var interstate;
  var analytics;
  var options = {
    projectId: '269d67cda55275c9e30fb0aaa0311c16ab79b344' // interstate@segment.com
  };

  beforeEach(function(){
    analytics = new Analytics;
    interstate = new Interstate(options);
    analytics.use(plugin);
    analytics.use(tester);
    analytics.add(interstate);
  });

  afterEach(function(){
    analytics.restore();
    analytics.reset();
    interstate.reset();
    sandbox();
  });

  it('should load', function(){
    analytics.initialize();
    debugger;
  });

});
