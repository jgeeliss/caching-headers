exports.handler = (event, context, callback) => {
    'use strict';
    const response = event.Records[0].cf.response;
    const request = event.Records[0].cf.request;
    const headers = response.headers;

    const url = request.uri;

    const headerCacheControl = 'Cache-Control';
    const defaultTimeToLive = 60 * 60 * 24 * 3; // 3 days

    if (response.status === '200') {
        if (url.endsWith('.js')) {
            headers[headerCacheControl.toLowerCase()] = [{
                key: headerCacheControl,
                value: `public, max-age=${defaultTimeToLive}`,
            }];
        }
        else {
            headers[headerCacheControl.toLowerCase()] = [{
                key: headerCacheControl,
                value: `no-cache, no-store, must-revalidate`,
                }];
        }
    }

    callback(null, response);
};