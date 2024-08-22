const https = require('https');

module.exports = (orangeAuthorizationHeader) => {
    return new Promise((resolve, reject) => {
        const credentials = orangeAuthorizationHeader;
        const postData = "grant_type=client_credentials";

        const options = {
            host: 'api.orange.com',
            path: '/oauth/v3/token',
            method: 'POST',
            headers: {
                'Authorization': credentials,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (response) => {
            let responseData = '';
            
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                responseData += chunk;
            });

            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseData);
                    if (parsedData.access_token) {
                        resolve(parsedData.access_token);
                    } else {
                        reject(new Error('Access token not found in response'));
                    }
                } catch (e) {
                    reject(new Error('Failed to parse response JSON'));
                }
            });
        });

        req.on('error', (e) => {
            reject(new Error(`Request failed: ${e.message}`));
        });

        req.write(postData);
        req.end();
    });
};
