var helpers = {
	wp_regex: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/,

	/**
	 * [checkStr description]
	 * @return {[type]} [description]
	 */
	checkStr: function (val) {
		var trimed = this.trim(val);
		return typeof trimed === 'string' && trimed.length > 0;
	},

	/**
	 * [checkObj description]
	 * @return {[type]} [description]
	 */
	checkObj: function (el) {
		return typeof el === 'object' && el instanceof Object && el.toString() === '[object Object]'
	},

	/**
	 * [trim description]
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	trim: function (str) {
		return str.replace(this.wp_regex, '');
	}
}

module.exports = helpers;