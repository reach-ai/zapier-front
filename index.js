const authentication = require('./authentication');
const recipe = require('./triggers/recipe')
const createDistribute = require("./creates/distribute");

// To include the API key on all outbound requests, simply define a function here.
// It runs runs before each request is sent out, allowing you to make tweaks to the request in a centralized spot.
const includeApiKey = (request, z, bundle) => {
    if (bundle.authData.apiKey) {
        request.headers.Authorization = `Bearer ${bundle.authData.apiKey}`;
        // request.headers['Content-Type'] = "application/json";
    }
    return request;
};

module.exports = {
    // This is just shorthand to reference the installed dependencies you have.
    // Zapier will need to know these before we can upload.
    version: require('./package.json').version,
    platformVersion: require('zapier-platform-core').version,
    
    authentication: authentication,
    
    beforeRequest: [
        includeApiKey
    ],

    // If you want your trigger to show up, you better include it here!
    triggers: {
        [recipe.key]: recipe
    },

    // If you want your searches to show up, you better include it here!
    searches: {},

    // If you want your creates to show up, you better include it here!
    creates: {
        [createDistribute.key]: createDistribute
    },

    resources: {},
};
