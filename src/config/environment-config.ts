export interface EnvironmentConfig {
  APP_URL: string;
  shouldLogRequestResponse: boolean;
}

// DEV
export const DevEnvironment: EnvironmentConfig = {
  APP_URL: "https://fakestoreapi.com",
  shouldLogRequestResponse: true,
};

// PROD
export const ProdEnvironment: EnvironmentConfig = {
  APP_URL: "https://fakestoreapi.com",
  shouldLogRequestResponse: false,
};
