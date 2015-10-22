var assert = require('chai').assert;
var expect = require('chai').expect;
var utils = require('../src/etty.util');

describe('utils test', function () {

	it('should check if value is a string', function (done) {
		assert.strictEqual(utils.checkStr('name'), true, 'should check correctly');
		assert.strictEqual(utils.checkStr('name '), true, 'should ignore wp');
		assert.strictEqual(utils.checkStr(''), false, 'should fail');
		assert.strictEqual(utils.checkStr('    '), false, 'should fail');
		done();
	});

	it('should check if value is an object', function (done) {
		assert.strictEqual(utils.checkObj({}), true);
		assert.strictEqual(utils.checkObj(' '), false);
		assert.strictEqual(utils.checkObj([]), false);
		done();
	});

	it('Should trim values', function (done) {
		assert.strictEqual(utils.trim('  name'), 'name');
		assert.strictEqual(utils.trim('   '), '');
		assert.strictEqual(utils.trim('wow cats!'), 'wow cats!');
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

		assert.strictEqual(utils.hasProperty(testObj, 'test'), true);
		assert.strictEqual(utils.hasProperty(testObj, 'value'), false);
		expect(function () {
			utils.hasProperty(function () {}, 'name');
		}).to.throw('Should be an Object');
		assert.strictEqual(utils.hasProperty(testObj2, 'test'), true);
		done();
	});

});
