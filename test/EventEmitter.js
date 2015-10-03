var assert = require('chai').assert;
var expect = require('chai').expect;
var EventEmitter = require('../src/EventEmitter');

describe('EventEmitter test case', function () {
	var em = new EventEmitter();
	var em2 = EventEmitter();

	it('should create correct EventEmmiter instance', function (done) {
		assert.strictEqual(em instanceof EventEmitter, true, 'Should be an instanceof EventEmitter');
		assert.strictEqual(em2 instanceof EventEmitter, true, 'Also should be instance even without new');
		done();
	});

	it('Should return correct max listeners length', function (done) {
		assert.strictEqual(em.getMaxListeners(), 10, 'default value fo event emitter should be correct');
		em.setMaxListeners(5);
		assert.strictEqual(em.getMaxListeners(), 5, 'Should allow user to change def value');
		em.setMaxListeners('bad value');
		assert.strictEqual(em.getMaxListeners(), 5, 'Should not work');
		done();
	});

	it('Should add events', function (done) {
		expect( function () { em.listeners('test:event') } ).to.throw('There is no such event');
		em.on('test:evt', function (args) {});

		var listeners = em.listeners('test:evt');

		expect(listeners).to.be.a('array');
		assert.strictEqual(listeners.length, 1);

		done();
	});

	it('Should return correct length of listeners for event', function (done) {
		assert.strictEqual(em.listenerCount('test:evt'), 1, 'listenerCount should return correct value');
		done();
	});

	it('Should correctly remove listener', function (done) {
		var evt = function () {};
		em.on('test:evt:2', evt);
		em.removeListener('test:evt:2', evt);
		expect(em.listeners('test:evt:2')).to.be.a('array');
		assert.strictEqual(!!em.listenerCount('test:evt:2'), false);
		done();
	});

	it('Should remove all listeners from event', function (done) {
		var handler1 = function (args) { };
		var handler2 = function (args) { };
		em.on('test:evt:3', handler1);
		em.on('test:evt:3', handler2);
		em.removeAllListeners('test:evt:3');
		assert.strictEqual(!!em.listenerCount('test:evt:3'), false);
		done();
	});
});
