
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var Identify = require('facade').Identify;
var useHttps = require('use-https');

/**
 * Expose `Interstate` integration.
 */

var Interstate = module.exports = integration('Interstate')
  .global('interstate')
  .option('projectId', null)
  .readyOnInitialize()
  .tag('<script src="//cdn.interstateanalytics.com/main/{{ projectId }}/project.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Interstate.prototype.initialize = function(page){
  this.load(this.ready);
};

/**
 * Alias.
 *
 * @param {Alias} alias
 */

Interstate.prototype.alias = function(alias){
  var to = alias.to();
  window.interstate.push(["alias", to]);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Interstate.prototype.identify = function(identify){
  var id = identify.userId();
  window.interstate.push(["identify", id]);
};

/**
 * Page.
 *
 * @param {Identify} page
 */

Interstate.prototype.page = function(page){
  var category = page.category();
  var name = page.fullName();
  var opts = this.options;

  if (category && opts.trackCategorizedPages){
    // Categorized pages
    window.interstate.push(["page", page.track(category)]);
  } else if (name && opts.trackNamedPages) {
    // Named pages
    window.interstate.push(["page", page.track(name)]);
  }
};

/**
 * Track.
 *
 * @param {Identify} identify
 */

Interstate.prototype.track = function(track){
  var props = track.properties();
  if (props.revenue) {
    props.revenue *= 100;
  }
  window.interstate.push(['track', track.event(), props]);
};
