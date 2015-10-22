'use strict';

var utils = require('./etty.util');

/**
 * @constructor
 * @param {Object} config object
 */
function Etty (config) {
	if (this instanceof Etty) {
		config = config || {};
		if (!utils.checkObj(config)) throw new TypeError('Should be an object');
		this.evtHash = {};
		this.config = {
			maxListeners: config.maxListeners || 10
		};
	} else {
		return new Etty(config);
	}
};


/**
 * Add event listener
 * @param  {String} evt     event name
 * @param  {Function} handler
 * @return {Object}  Etty object
 */
Etty.prototype.on = function(evt, handler) {
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
Etty.prototype.addListener = Etty.prototype.on;


/**
 * Add event that only can be executable once
 * @param  {String} evt     event name
 * @param  {Function} handler
 * @return {Object}   Etty object
 */
Etty.prototype.once = function(evt, handler) {
	var self = this;
	var evtHash = self.evtHash;

	var listener = function (args) {
		handler(args);
		self.removeListener(evt, listener);
	};

	if (!utils.hasProperty(evtHash, evt)) {
		evtHash[evt] = [listener]
	} else {
		evtHash[evt].push(listener);
	}

	return self;
};


/**
 * Emit an event
 * @param  {String} evt
 * @return {Object} Etty object
 */
Etty.prototype.emit = function (evt, args) {
	if (args && !utils.checkObj(args)) throw new TypeError('Should be an object');
	args = args || {};
	var evts = this.evtHash;
	if (utils.hasProperty(evts, evt)) {
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
Etty.prototype.getMaxListeners = function () {
	return this.config.maxListeners;
};


/**
 * @param {Int} num
 */
Etty.prototype.setMaxListeners = function (num) {
	if (typeof num === 'number' && num) {
		this.config.maxListeners = num;
	}

	return this;
};


/**
 * Remove event listener from an event
 * @param  {String} evt
 * @param  {Function} handler
 * @return {Object}  Etty object
 */
Etty.prototype.removeListener = function (evt, handler) {
	var allEvts = this.evtHash;
	if (utils.hasProperty(allEvts, evt)) {
		var index = allEvts[evt].indexOf(handler);
		if (index < 0) return;
		allEvts[evt].splice(index, 1);
	}

	return this;
};


/**
 * Remove all listeners from an event
 * @param  {String} evt
 * @return {Object} 		 Etty object
 */
Etty.prototype.removeAllListeners = function (evt) {
	var allEvents = this.evtHash;

	if (utils.hasProperty(allEvents, evt) && !!allEvents[evt].length) {
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
Etty.prototype.listenerCount = function (evt) {
	var allEvts = this.evtHash;
	if (utils.hasProperty(allEvts, evt)) {
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
Etty.prototype.listeners = function (evt) {
	var evts = this.evtHash;
	if (utils.hasProperty(evts, evt)) {
		return evts[evt];
	} else {
		throw new Error('There is no such event');
	}
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Etty;
} else {
	window.Etty = Etty;
}
