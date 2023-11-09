const rawConfig = open("../config/test-configuration.json");
const parsedConfig = JSON.parse(rawConfig);

const env = __ENV.TEST_ENVIRONMENT || "dev"

/**
 * Get the environment config from the test-environment.json file
 * @returns {*}
 */
export function getEnvironmentConfig() {
    let envConfig = parsedConfig[env];
    if (envConfig === undefined) {
        throw new Error(`Configuration for environment ${env} not found.`);
    }

    // Override with environment variables
    for (let key in envConfig) {
        if (__ENV[key]) {
            envConfig[key] = __ENV[key];
        }
    }

    return envConfig;
}
