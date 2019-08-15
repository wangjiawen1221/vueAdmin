'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://47.111.65.117/vueApi/public/api/v1/"',
});
