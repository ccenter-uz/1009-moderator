export const enum STEPS_ENUM {
  "firstStep" = 0,
  "secondStep" = 1,
  "thirdStep" = 2,
  "fourthStep" = 3,
}

export const enum ADDITIONAL_EDIT_STEPS {
  ADDITIONAL_EDIT_FIRST_STEP = "additionalEditFirstStep",
  ADDITIONAL_EDIT_SECOND_STEP = "additionalEditSecondStep",
  ADDITIONAL_EDIT_THIRD_STEP = "additionalEditThirdStep",
  ADDITIONAL_EDIT_CURRENT_STEP = "additionalEditCurrentStep",
}

export const enum ADDITIONAL_ADD_STEPS {
  ADDITIONAL_ADD_FIRST_STEP = "additionalAddFirstStep",
  ADDITIONAL_ADD_SECOND_STEP = "additionalAddSecondStep",
  ADDITIONAL_ADD_THIRD_STEP = "additionalAddThirdStep",
  ADDITIONAL_ADD_CURRENT_STEP = "additionalAddCurrentStep",
}

export const enum API_METHODS {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const enum RESPONSE_STATUS {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  DELETED = 204,
  UPDATED = 204,
  BAD_REQUEST = 400,
  UNAUTHENTICATED = 401,
  UNAUTHORIZED = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export const enum STATUS {
  ACTIVE = 1,
  INACTIVE = 0,
  ALL = 2,
}

export const enum STEPS_EDIT_DATA {
  FIRST = "firstStepDataEdit",
  SECOND = "secondStepDataEdit",
  THIRD = "thirdStepDataEdit",
  FOURTH = "fourthStepDataEdit",
  CURRENT = "currentStepEdit",
  EDIT_ID = "editingOrgId",
}

export const enum ROLES {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
}

export const enum CreatedByEnum {
  All = "all",
  Billing = "billing",
  Client = "client",
  Moderator = "moderator",
}
