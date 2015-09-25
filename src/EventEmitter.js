var helpers = require('./EventEmitter.helpers.js');

var EventEmitter = function (config) {
	config = config || {};
	if (!helpers.checkObj(config)) throw new TypeError('Should be an object');
	this.evtHash= {};
	this.config = {
		useCapture: config.useCapture || false,
		root: config.root || window,
		maxListeners: config.maxListeners || 10
	}
};

EventEmitter.prototype.on = function(evt, handler) {
 	var customEvt = new Event(evt);

  this.config.root.addEventListener(evt, function (e) {
  	handler(e);
  }, this.config.useCapture);
  var evts = this.evtHash;
  if (!evts.hasOwnProperty(evt)) {
  	evts[evt] = {
  		evt: customEvt,
  		handlers: [handler]
  	};
  } else {
  	(evts[evt].handlers.length < this.config.maxListeners)
  		? evts[evt].handlers.push(handler)
  		: null;
  }

  return this;
};

EventEmitter.prototype.emit = function (evt) {
	var evts = this.evtHash;
	if (evts.hasOwnProperty(evt)) {
		this.config.root.dispatchEvent(evts[evt].evt);
	} else {
		throw new Error('There is now such event handler');
	}
};

EventEmitter.prototype.getMaxListeners = function () {
 	return this.config.maxListeners;
};

EventEmitter.prototype.setMaxListeners = function (num) {
	if (typeof num === 'number' && num) {
		this.config.maxListeners = num;
	}
}

EventEmitter.prototype.removeListener = function (evt, handler) {
	this.config.root.removeEventListener(evt, handler, this.config.useCapture)
};

EventEmitter.prototype.removeAllListeners = function (evt) {
	var allHandlers = this.evtHash[evt].handlers;
	var len = allHandlers.length;
	var root = this.root;
	var capture = this.config.useCapture, i;

	for (	i = 0; i < allHandlers.length; i++ ) {
		root.removeEventListener(evt, allHandlers[i], capture);
	}
}

EventEmitter.prototype.listenerCount = function (evt) {
	if (this.evtHash.hasOwnProperty(evt)) {
		return this.evtHash[evt].handlers.length;
	} else {
		throw new Error('There is no such event');
	}
}

EventEmitter.prototype.listeners = function (evt) {
	var allEvents = this.evtHash;
	if (allEvents.hasOwnProperty(evt)) {
		return allEvents[evt].handlers;
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = EventEmitter;
} else {
	window.EventEmitter = EventEmitter;
}
