import { config } from 'dotenv';
import { EnvironmentPlugin } from 'webpack';

config();

module.exports = {
  plugins: [new EnvironmentPlugin(['API_URL', 'ENV_TYPE'])]
};
