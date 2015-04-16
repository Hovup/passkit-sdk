/**
 * PassKIT API Helper for Node JS
 * @author Jorge Garrido <zgbjgg@gmail.com>
 */
"use strict";

/* Requires */
var querystring = require('querystring');
var curl = require('node-curl');

/* Main */
module.exports = function () {

        /* Version SDK */
        var sdk_version = '0.1.0';

	/* User-Agent to be send into Headers request */
        var user_agent = 'PassKIT/rest-sdk-nodejs ' + sdk_version + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + ')';

        /* Create our default options */
	/* TODO: Use timeouts! */
        var default_options = {
                'connection_timeout': '1000',
                'connection_readtimeout': '3000',
                'url':'https://api.passkit.com',
		'apiKey': '',
		'apiSecret': '',
		'apiVersion': 'v1',
        };	


        /* Function for updating the default options for the
           given options */
        function update_options(new_options, options) {
                for (var opt in options) {
                        new_options[opt] = options[opt];
                }
                return new_options;
        }

        /* Function to retrive the default options */
        function get_default_options() {
                return default_options;
        }

        /* Function to initialize options on SDK */
        function configure(options) {
                if (options !== undefined && typeof options === 'object') {
                	default_options = update_options(default_options, options);
        	}
        }

	function doQuery(http_method, endpoint, req_data, http_options_param, callback) {	

                // Add version to resource
                var endpoint = '/' + get_default_options().apiVersion + endpoint;

                // Empty http_options (declare)
                var http_options = {};

                // JSON or QueryString
                var data = req_data;
		
                // If method is GET then encode as query string, otherwise as JSON-RPC
                if (http_method === 'GET') {
                        if (typeof data !== 'string') {
                                data = querystring.stringify(data);
                        }
                        if (data) {
                                // add to resource and empty data
                                endpoint = endpoint + "?" + data;
                                data = "";
                        }
                } else if (typeof data !== 'string') {
                        data = JSON.stringify(data);
                }

		// Auth with digest only!
		http_options.HTTPAUTH = 2;
		
		// Build USERPWD option
		http_options.USERPWD = get_default_options().apiKey + ':' + get_default_options().apiSecret;

		// If POST, otherwise GET
		if ( http_method === 'POST' ) {
			http_options.POST = 1;

			http_options.POSTFIELDS = data;

                	// Add length of data
                	/*if (data) {
                        	http_options.headers['Content-Length'] = Buffer.byteLength(data, 'utf-8');
                	}*/	
                
			// JSON
                	/*if (!http_options.headers.Accept) {
                        	http_options.headers.Accept = 'application/json';
                	}*/

                	// JSON
                	/*if (!http_options.headers['Content-Type']) {
                        	http_options.headers['Content-Type'] = 'application/json';
                	}*/
	
		} 

		curl(get_default_options().url + endpoint, http_options, function(err) {
			if (err) {
				callback(err, null);
			} else {
				var response = {};
				response.httpStatusCode = this.code;
				response.body = this.body;
				callback(null, response);
			}
		});	
	}

	/* Must return all vars and/or function exported */
	return {
		version: sdk_version,
                configure: function(options) {
                        configure(options)
                },

		// Templates
		template: {
			list: function(callback) {
				doQuery('GET', '/template/list', {}, {}, callback);
			}

		},

		// Passes 
		pass: {
			issue: function(template_id, req_data, callback) {
				doQuery('POST', escape('/pass/issue/template/' + template_id), req_data, {}, callback);
			}
		}
		
	};
};
