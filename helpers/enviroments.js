/*
 * Title: Environments
 * Description: Handle all environment related things
 * Author: Fazle Hasan Rabbi
 * Date: 02/01/2025
 *
 */

// dependencies

// module scaffolding
const environments = {};

// staging environment
environments.staging = {
  port: 3000,
  envName: "staging",
  secretKey : 'hwerubuewtbuyvef'
};

// production environment
environments.production = {
  port: 5000,
  envName: "production",
  secretKey : 'kjhugweuiewwe'
};
// determine which environment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding environment object
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

// export module
module.exports = environmentToExport;
