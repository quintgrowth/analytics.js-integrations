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
  });

  describe('after loading', function(){
    beforeEach(function(done){
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });

    describe('#track', function(){
      beforeEach(function(){
        analytics.stub(window.interstate, 'push');
      });

      it('should track an event', function(){
        analytics.track('my_event', {revenue: 300, somethingelse: 4});
        analytics.called(window.interstate.push, ['track', 'my_event', {revenue: 300, somethingelse: 4}]);
      });
    });

    describe('#identify', function(){
      beforeEach(function(){
        analytics.stub(window.interstate, 'push');
      });

      it('should send the identify event', function(){
        analytics.identify('george@asdf.com');
        analytics.called(window.interstate.push, ['identify', 'george@asdf.com']);
      });
    });

    describe('#alias', function(){
      beforeEach(function(){
        analytics.stub(window.interstate, 'push');
      });

      it('should send a new id', function(){
        analytics.alias('someid');
        analytics.called(window.interstate.push, ['alias', 'someid']);
      });

      it('should send just the new id', function(){
        analytics.alias('new', 'old');
        analytics.called(window.interstate.push, ['alias', 'new']);
      });
    });
  });

});
