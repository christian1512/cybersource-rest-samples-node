'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function get_list_of_files(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var startDate = '2020-03-20';
		var endDate = '2020-03-30';
		var organizationId = "testrest";

		var opts = [];
		if (organizationId != null) opts['organizationId'] = organizationId;

		var instance = new cybersourceRestApi.SecureFileShareApi(configObject, apiClient);

		instance.getFileDetail(startDate, endDate, opts, function (error, data, response) {
			if (error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Get List of Files : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	get_list_of_files(function () {
		console.log('\nGetFileDetail end.');
	});
}
module.exports.get_list_of_files = get_list_of_files;
