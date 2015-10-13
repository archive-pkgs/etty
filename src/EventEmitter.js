'use strict';

var helpers = require('./EventEmitter.helpers');

/**
 * @constructor
 * @param {Object} config object
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
 * Add event listener
 * @param  {String} evt     event name
 * @param  {Function} handler
 * @return {Object}  EventEmitter object
 */
EventEmitter.prototype.on = function(evt, handler) {
	var self = this;
	var evts = self.evtHash;
	var config = self.config;

	if (!evts.hasOwnProperty(evt)) {
		evts[evt] = [handler];
	} else {
		if (evts[evt].length < config.maxListeners) {
			evts[evt].push(handler);
		} else {
			throw new Error('Can not add more than ' + config.maxListeners + ' handlers');
		}
	}

	return self;
};


// human hack
EventEmitter.prototype.addListener = EventEmitter.prototype.on;


/**
 * Add event that only can be executable once
 * @param  {String} evt     event name
 * @param  {Function} handler
 * @return {Object}   EventEmitter object
 */
EventEmitter.prototype.once = function(evt, handler) {
	var self = this;
	var config = self.config;
	var evtHash = self.evtHash;

	var listener = function (args) {
		handler(args);
		self.removeListener(evt, listener);
	};

	if (!helpers.hasProperty(evtHash, evt)) {
		evtHash[evt] = [listener]
	} else {
		evtHash[evt].push(listener);
	}

	return self;
};


/**
 * Emit an event
 * @param  {String} evt
 * @return {Object} EventEmitter object
 */
EventEmitter.prototype.emit = function (evt, args) {
	if (args && !helpers.checkObj(args)) throw new TypeError('Should be an object');
	args = args || {};
	var evts = this.evtHash;
	if (helpers.hasProperty(evts, evt)) {
		evts[evt].forEach(function (handler) {
			handler(args);
		});
	} else {
		throw new Error('There is now such event handler');
	}

	return this;
};


/**
 * Return max listeners for single event length
 * @return {Int}
 */
EventEmitter.prototype.getMaxListeners = function () {
	return this.config.maxListeners;
};


/**
 * @param {Int} num
 */
EventEmitter.prototype.setMaxListeners = function (num) {
	if (typeof num === 'number' && num) {
		this.config.maxListeners = num;
	}

	return this;
};


/**
 * Remove event listener from an event
 * @param  {String} evt
 * @param  {Function} handler
 * @return {Object}  EventEmitter object
 */
EventEmitter.prototype.removeListener = function (evt, handler) {
	var allEvts = this.evtHash;
	if (helpers.hasProperty(allEvts, evt)) {
		var index = allEvts[evt].indexOf(handler);
		if (index < 0) return;
		allEvts[evt].splice(index, 1);
	}

	return this;
};


/**
 * Remove all listeners from an event
 * @param  {String} evt
 * @return {Object} 		 EventEmitter object
 */
EventEmitter.prototype.removeAllListeners = function (evt) {
	var allEvents = this.evtHash;

	if (helpers.hasProperty(allEvents, evt) && !!allEvents[evt].length) {
		this.evtHash[evt].length = 0;
		return this;
	}

	return;
};


/**
 * Get listers count for an event
 * @param  {String} evt
 * @return {Int}     length of all Events;
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
 * Get listeners as an array
 * @param  {String} evt event name
 * @return {Array}     array of listeners
 */
EventEmitter.prototype.listeners = function (evt) {
	var evts = this.evtHash;
	if (helpers.hasProperty(evts, evt)) {
		return evts[evt];
	} else {
		throw new Error('There is no such event');
	}
};


if (typeof module !== 'undefined' && module.exports) {
	module.exports = EventEmitter;
} else {
	window.EventEmitter = EventEmitter;
}
