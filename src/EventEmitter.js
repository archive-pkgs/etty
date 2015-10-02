'use strict';

var helpers = require('./EventEmitter.helpers');

/**
 * [EventEmitter description]
 * @param {[type]} config [description]
 */
var EventEmitter = function (config) {
	if (this instanceof EventEmitter) {
		config = config || {};
		if (!helpers.checkObj(config)) throw new TypeError('Should be an object');
		this.evtHash= {};
		this.config = {
			maxListeners: config.maxListeners || 10,
			handlersDelay: config.handlersDelay || 0
		};
	} else {
		return new EventEmitter(config);
	}
};


/**
 *
 * @param  {[type]} evt     [description]
 * @param  {[type]} handler [description]
 * @return {[type]}         [description]
 */
EventEmitter.prototype.on = function(evt, handler) {
	var self = this;
	var evts = self.evtHash;
	var config = self.config;

	if (!evts.hasOwnProperty(evt)) {
		evts[evt] = [handler];
	} else {
		if (evts[evt].handlers.length < config.maxListeners) {
			evts[evt].push(handler);
		} else {
			throw new Error('Can not add more than ' + config.maxListeners + ' handlers');
		}
	}

	return this;
};

EventEmitter.prototype.addListener = EventEmitter.prototype.on;


/**
 * [once description]
 * @param  {[type]} evt     [description]
 * @param  {[type]} handler [description]
 * @return {[type]}         [description]
 */
EventEmitter.prototype.once = function(evt, handler) {
	var customEvt = new Event(evt);
	var self = this;
	var config = self.config;
	var evtHash = self.evtHash;

	if (!helpers.hasProperty(evtHash, evt)) {
		evtHash[evt] = {
			evt: customEvt,
			handlers: [handler]
		};
	} else {
		evtHash[evt].handlers.push(handler);
	}
};


/**
 * [emit description]
 * @param  {[type]} evt [description]
 * @return {[type]}     [description]
 */
EventEmitter.prototype.emit = function (evt) {
	var args = ([]).slice.call(arguments, 1);
	var evts = this.evtHash;
	if (helpers.hasProperty(evts, evt)) {
		evts[evt].forEach(function (handler) {
			handler(args);
		});
	} else {
		throw new Error('There is now such event handler');
	}
};


/**
 * [getMaxListeners description]
 * @return {[type]} [description]
 */
EventEmitter.prototype.getMaxListeners = function () {
	return this.config.maxListeners;
};


/**
 * [setMaxListeners description]
 * @param {[type]} num [description]
 */
EventEmitter.prototype.setMaxListeners = function (num) {
	if (typeof num === 'number' && num) {
		this.config.maxListeners = num;
	}
};


/**
 * [removeListener description]
 * @param  {[type]} evt     [description]
 * @param  {[type]} handler [description]
 * @return {[type]}         [description]
 */
EventEmitter.prototype.removeListener = function (evt, handler) {
	var allEvts = this.evtHash;
	if (helpers.hasProperty(allEvts, evt)) {
		var index = allEvts[evt].indexOf(handler);
		if (index < 0) return;
		return allEvts[evt].splice(index, 1);
	}
};


/**
 * [removeAllListeners description]
 * @param  {[type]} evt [description]
 * @return {[type]}     [description]
 */
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


/**
 * [listenerCount description]
 * @param  {[type]} evt [description]
 * @return {[type]}     [description]
 */
EventEmitter.prototype.listenerCount = function (evt) {
	var allEvts = this.evtHash;
	if (helpers.hasProperty(allEvts, evt)) {
		return allEvts[evt].length;
	} else {
		throw new Error('There is no such event');
	}
};


/**
 * [listeners description]
 * @param  {[type]} evt [description]
 * @return {[type]}     [description]
 */
EventEmitter.prototype.listeners = function (evt) {
	var evts = this.evtHash;
	if (helpers.hasProperty(evts, evt)) {
		return allEvents[evt];
	}
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = EventEmitter;
} else {
	window.EventEmitter = EventEmitter;
}
