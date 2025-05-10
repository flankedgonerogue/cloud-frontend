const env = {
  // Public
  webhookURL: process.env.NEXT_PUBLIC_WEBHOOK_URL!,

  // Klarna credentials — keep private
  klarnaUsername: process.env.KLARNA_API_USERNAME!,
  klarnaPassword: process.env.KLARNA_API_PASSWORD!,

  // Self URLs
  selfAuthorizationCallbackURL: process.env.SELF_KLARNA_AUTHORIZATION_CALLBACK_URL!,
  selfBaseURL: process.env.SELF_BASE_URL!,
  selfPaymentSuccessURL: process.env.SELF_PAYMENT_SUCCESS_URL!,
  selfPaymentNotificationURL: process.env.SELF_PAYMENT_NOTIFICATION_URL!,
  selfPaymentErrorURL: process.env.SELF_PAYMENT_ERROR_URL!,

  // Klarna Endpoints
  klarnaSessionCreateEndpoint: process.env.KLARNA_API_SESSION_CREATE_ENDPOINT!,
  klarnaOrderCreationEndpointTemplate: process.env.KLARNA_API_ORDER_CREATION_ENDPOINT!,
  klarnaSessionUpdateEndpointTemplate: process.env.KLARNA_API_SESSION_UPDATE_ENDPOINT!,
};

// Helper functions to inject parameters into Klarna URLs
export const getKlarnaOrderCreationURL = (authorizationToken: string): string => {
  return env.klarnaOrderCreationEndpointTemplate.replace("{authorization_token}", authorizationToken);
};

export const getKlarnaSessionUpdateURL = (sessionId: string): string => {
  return env.klarnaSessionUpdateEndpointTemplate.replace("{session_id}", sessionId);
};

export const getFilledURL = (url: string, locale: string): string => {
  return url.replace("{base_url}", env.selfBaseURL).replace("{locale}", locale);
};

Object.entries(env).forEach(([key, value]) => {
  if (!value) throw new Error(`${key} is not defined in .env`);
});

export default env;
