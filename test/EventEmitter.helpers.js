var assert = require('chai').assert;
var helpers = require('../src/EventEmitter.helpers.js');

describe('helpers test', function () {
	it('should check if value is a string', function (done) {
		assert.equal(helpers.checkStr('name'), true, 'should check correctly');
		assert.equal(helpers.checkStr('name '), true, 'should ignore wp');
		assert.equal(helpers.checkStr(''), false, 'should fail');
		assert.equal(helpers.checkStr('    '), false, 'should fail');
		done();
	});
	it('should check if value is an object', function (done) {
		assert.equal(helpers.checkObj({}), true);
		assert.equal(helpers.checkObj(' '), false);
		assert.equal(helpers.checkObj([]), false);
		done();
	});
});
