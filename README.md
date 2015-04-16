PassKIT SDK for Node JS
=======================

PassKIT API Rest SDK for Node JS

Welcome to the unofficial PassKIT SDK for Node JS, this SDK is to integrate PassKIT API into a node js app in an easy and fashion way. 

SDK Integration
===============

In order to integrate the SDK into your node.js project follow the next steps:

* Install urllib dependency into your system.

* Add dependency 'passkit-sdk' to your `package.json` file.

* Require 'passkit-sdk' in your script

	```javascript
		var passkit_sdk = require('passkit-sdk');	
	```
	
* Configure SDK, by providing the required parameters:

	```javascript
		passkit_sdk.configure({ apiKey: 'Your API Key',
                        		apiSecret: 'Your API Secret Key'
		});	
	```

	All configure options available are:
	
	* connection_timeout - the timeout to wait a request
	* connection_readtimeout - the timeout to read response
	* api_version - the version of API (defualt v1)
	* apiKey - the api key of your passkit account
	* apiSecret - the api secret key of your passkit account
	
* Invoke API

	```javascript
		passkit_sdk.template.list(function(err, cb) {
        	    if (err) {
                	console.log(err);
        	    } else {
                	console.log(cb);
        	    }
		});		
	```

About
=====
Created in The Hover Cloud Programming Engine Inc. 
