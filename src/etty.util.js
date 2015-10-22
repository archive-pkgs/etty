'use strict';

module.exports = {

	/**
	 * hasOwnProperty util for more secure work
	 * @param  {Object}  obj
	 * @param  {String}  prop
	 * @return {Boolean}
	*/
	hasProperty: function (obj, prop) {
		if (!this.checkObj(obj)) { throw new TypeError('Should be an Object') }
		return ({}).hasOwnProperty.call(obj, prop);
	},


	/**
	 * Whitespace trim util
	 * @param  {String} str
	 * @return {String} new str with trimed whitespaces
	*/
	trim: function (str) {
		return str.replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/, '');
	},


	/**
	 * Helper for checking if given value
	 * is an Object
	 * @param  val
	 * @return {Boolean}
	*/
	checkObj: function (val) {
		return val instanceof Object && val.toString() === '[object Object]';
	},


	/**
	 * Helper for checking if given value
	 * is a string
	 * @param  val
	 * @return {Boolean}
	 */
	checkStr: function (val) {
		var trimed = this.trim(val);
		return (typeof trimed === 'string' && trimed.length > 0);
	}

};
