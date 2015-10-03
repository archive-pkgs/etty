'use strict';

module.exports = {

	/**
	 * hasOwnProperty helper for more secure work
	 * @param  {Object}  obj
	 * @param  {String}  prop
	 * @return {Boolean}
	*/
	hasProperty: function (obj, prop) {
		if (!this.checkObj(obj)) { throw new TypeError('Should be an Object') }
		return ({}).hasOwnProperty.call(obj, prop);
	},


	/**
	 * hasOwnProperty for more than one arguments
	 * @param  {Object}  obj
	 * @return {Boolean}
	 */
	hasProperties: function (obj, props) {
		if (!this.checkObj) { throw new TypeError('Should be an Object') }
		if (props === undefined) { throw new Error('At least one prop should be defined') }
		props = ([]).slice.call(arguments, 1);
		var ownProps = ({}).getOwnProperties.call(obj);
		return props.reduce(function (acc, i) {
			if ( ownProps.indexOf(props[i]) < 0 ) {
				acc = false;
			}
		}, true);
	},


	/**
	 * Whitespace trim helper
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
