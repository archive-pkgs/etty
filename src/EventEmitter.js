var helpers = require('./EventEmitter.helpers.js');

var EventEmitter = function (config) {
	if (!helpers.checkObj(config)) throw new TypeError('Should be an object');
	config = config || {};
	this._events = {};
	this.config = {
		useCapture: config.useCapture || false,
		rootObj: config.rootObj || window,
		maxListeners: config.maxListeners || 10;
	}
};

EventEmitter.prototype.on = function(evt, cb) {
	if (this._helpers.checkStr(str)) { throw new TypeError('Should be a string') }
 	var customEvent = new CustomEvent(evt); // create custom evt object from our evt string
  this.config.rootObj.addEventListener(evt, function (e) {
  	cb(e);
  }, this.config.useCapture);
};

EventEmitter.prototype.removeListener = function (evt, handler) {
	this.config.rootObj.removeEventListener(evt, handler, this.config.useCapture)
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = EventEmitter;
} else {
	window.EventEmitter = EventEmitter;
}

// var em = new EventEmitter():
// em.once('message:delivered', function () {
// 	return true;
// })