'use strict';

var helpers = require('./EventEmitter.helpers');

var EventEmitter = function (config) {
	config = config || {};
	if (!helpers.checkObj(config)) throw new TypeError('Should be an object');
	this.evtHash= {};
	this.config = {
		maxListeners: config.maxListeners || 10,
		handlersDelay: config.handlersDelay || 0
	};
};

EventEmitter.prototype.on = function(evt, handler) {
	var customEvt = new Event(evt);
	var self = this;
	var evts = self.evtHash;
	var config = self.config;

	if (!evts.hasOwnProperty(evt)) {
		evts[evt] = {
			evt: customEvt,
			handlers: [handler]
		};
	} else {
		if (evts[evt].handlers.length < config.maxListeners) {
			evts[evt].handlers.push(handler);
		} else {
			throw new Error('Can not add more than ' + config.maxListeners + ' handlers');
		}
	}

	return this;
};

EventEmitter.prototype.addListener = EventEmitter.prototype.on;

EventEmitter.prototype.once = function(evt, handler) {
	var customEvt = new Event(evt);
	var self = this;
	var config = self.config;
	var evtHash = self.evtHash;

	var listener = function () {
		handler();
	}
	if (!evtHash.hasOwnProperty(evt)) {
		evtHash[evt] = {
			evt: customEvt,
			handlers: [handler]
		};
	} else {
		evtHash[evt].handlers.push(handler);
	}
};

EventEmitter.prototype.emit = function (evt) {
	var evts = this.evtHash;
	if (evts.hasOwnProperty(evt)) {

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
};

EventEmitter.prototype.removeListener = function (evt, handler) {
	if (this.evtHash.hasOwnProperty(evt)) {
		this.config.root.removeEventListener(evt, handler, this.config.useCapture);
	}
};

EventEmitter.prototype.removeAllListeners = function (evt) {
	var evtObj = this.evtHash[evt];
	var len = evtObj.handlers.length;
	var root = this.root;
	var capture = this.config.useCapture, i;

	for (	i = 0; i < allHandlers.length; i++ ) {
		root.removeEventListener(evt, evtObj.handlers[i], capture);  //use already defined method
	}

	delete this.evtHash[evt];
};

EventEmitter.prototype.listenerCount = function (evt) {
	if (this.evtHash.hasOwnProperty(evt)) {
		return this.evtHash[evt].handlers.length;
	} else {
		throw new Error('There is no such event');
	}
};

EventEmitter.prototype.listeners = function (evt) {
	var allEvents = this.evtHash;
	if (allEvents.hasOwnProperty(evt)) {
		return allEvents[evt].handlers;
	}
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = EventEmitter;
} else {
	window.EventEmitter = EventEmitter;
}
