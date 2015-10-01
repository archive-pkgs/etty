var assert = require('chai').assert;
var expect = require('chai').expect;
var helpers = require('../src/EventEmitter.helpers');

describe('helpers test', function () {

	it('should check if value is a string', function (done) {
		assert.strictEqual(helpers.checkStr('name'), true, 'should check correctly');
		assert.strictEqual(helpers.checkStr('name '), true, 'should ignore wp');
		assert.strictEqual(helpers.checkStr(''), false, 'should fail');
		assert.strictEqual(helpers.checkStr('    '), false, 'should fail');
		done();
	});

	it('should check if value is an object', function (done) {
		assert.strictEqual(helpers.checkObj({}), true);
		assert.strictEqual(helpers.checkObj(' '), false);
		assert.strictEqual(helpers.checkObj([]), false);
		done();
	});

	it('Should trim values', function (done) {
		assert.strictEqual(helpers.trim('  name'), 'name');
		assert.strictEqual(helpers.trim('   '), '');
		assert.strictEqual(helpers.trim('wow cats!'), 'wow cats!');
		done();
	});

	it('Should check if object has own property', function (done) {
		var testObj = {
			test: 'beep boop'
		};

		var testObj2 = {
			hasOwnProperty: function () {
				console.log('hacked!');
			},
			test: 'beep boop'
		};

		assert.strictEqual(helpers.hasProperty(testObj, 'test'), true);
		assert.strictEqual(helpers.hasProperty(testObj, 'value'), false);
		expect(function () {
			helpers.hasProperty(function () {}, 'name');
		}).to.throw('Should be an Object');
		assert.strictEqual(helpers.hasProperty(testObj2, 'test'), true);
		done();
	});

});
