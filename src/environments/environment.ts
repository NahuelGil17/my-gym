/**
 * Environment type value supplied by .env file
 */
export const envtype = process.env['ENV_TYPE'] ? JSON.parse(process.env['ENV_TYPE']) : false;

/**
 * The environment object for the production environment.
 */
export const environment = {
  /**
   * A boolean indicating whether the application is in production mode or not.
   */
  production: envtype.production,
  /**
   * The name of the application.
   */
  appName: 'SimpleSOLV Admin',
  /**
   * The version of the application, obtained from the package.json file.
   */
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  appVersion: require('../../package.json').version,
  /**
   * The URL of the API for the application.
   */
  api: process.env['API_URL'],
  /**
   * The configuration settings for the application.
   */
  config: {
    /**
     * The number of items to display per page.
     */
    pageSize: 1,
    /**
     * The size of the grid for the application.
     */
    gridSize: 9
  }
};
