const Joi = require('joi');

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'demo', 'test').required(),
    REACT_APP_API_URL: Joi.string().allow('').default('').description('backend server url'),
    REACT_APP_ROWS_PER_PAGE: Joi.number().default(10).description('number of users per page in users table'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  api: {
    url: envVars.NODE_ENV === 'production' ? envVars.REACT_APP_API_URL : '',
  },
  table: {
  	resultsPerPage: envVars.REACT_APP_ROWS_PER_PAGE,
  },
};
