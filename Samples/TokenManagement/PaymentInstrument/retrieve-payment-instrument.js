'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var createPaymentInstrument = require('../PaymentInstrument/create-payment-instrument-card');

function retrieve_payment_instrument(callback) {
	var profileid = '93B32398-AD51-4CC2-A682-EA3E93614EB1';

	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();

		var instance = new cybersourceRestApi.PaymentInstrumentApi(configObject, apiClient);

		createPaymentInstrument.create_payment_instrument_card(function (error, data, response) {
			if (!error) {
				var tokenId = data['id'];
				instance.getPaymentInstrument(profileid, tokenId, function (error, data, response) {
					if (error) {
						console.log('\nError : ' + JSON.stringify(error));
					}
					else if (data) {
						console.log('\nData : ' + JSON.stringify(data));
					}

					console.log('\nResponse : ' + JSON.stringify(response));
					console.log('\nResponse Code of Retrieve a Payment Instrument : ' + JSON.stringify(response['status']));
					callback(error, data, response);
				});
			}
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {
	retrieve_payment_instrument(function () {
		console.log('\nGetPaymentInstrument end.');
	});
}
module.exports.retrieve_payment_instrument = retrieve_payment_instrument;
