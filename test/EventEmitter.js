var assert = require('chai').assert;
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
		var em = new EventEmitter();
		assert.strictEqual(em.getMaxListeners(), 10, 'default value fo event emitter should be correct');
		em.setMaxListeners(5);
		assert.strictEqual(em.getMaxListeners(), 5, 'Should allow user to change def value');
		em.setMaxListeners('bad value');
		assert.strictEqual(em.getMaxListeners(), 5, 'Should not work');
		done();
	});

	it('Should add events', function (done) {

		done();
	});

	it('Should return correct length of listeners for event', function (done) {
		assert.strictEqual('', function () {

		});
		done();
	});
});
