'use strict';

var path = process.cwd();
var parser = require('ua-parser-js');

module.exports = function (app) {
	
	var getClientOS = function (req) {
		var uastring = req.headers['user-agent'];
    	var ua = parser(uastring);
    	console.log(ua);
    	return ua.os.name + ' ' + ua.os.version;
	}
	
	var getClientAddress = function (req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
	};

	app.route('/api/whoami')
		.get(function (req, res) {
			var ip = req.headers['x-forwarded-for'];
			var language = req.headers["accept-language"].split(',')[0];
			var software = getClientOS(req);
			res.json({
				ip: ip,
				language: language,
				software: software
			});
		});
};
