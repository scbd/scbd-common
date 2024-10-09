import { inject } from 'vue';

const ApiOptions = {
  install(app, options) {
    // Provide the options globally
    app.provide('sitePrefixUrl', options.sitePrefixUrl);
    app.provide('timeout', options.timeout);
    app.provide('token', options.token);
    app.provide('tokenType', options.tokenType);
  }
};

export default ApiOptions;