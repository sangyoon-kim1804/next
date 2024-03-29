export const IS_PROD = process.env.NODE_ENV === "production";
export const IS_DEPLOY_GROUP_PROD = process.env.DEPLOY_GROUP === "production";

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const isDevelopment = !IS_DEPLOY_GROUP_PROD;
const isProduction = IS_DEPLOY_GROUP_PROD;

export { isDevelopment, isProduction };
