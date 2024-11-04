export const ERRORS = {
  SESSION: {
    EXPIRED: 'Session expired. Please try again',
    LAST_LOGGED_IN_DEVICE: 'Only recently logged in device can be trusted',
  },
  STRIPE: {
    COMMON: {
      INVALID_AMOUNT: 'Invalid amount',
    },
    EXPRESS_ACCOUNT: {
      ALREADY_EXIST: 'Account already exists. try to login',
      ID_REQUIRED: 'Account id is required',
    },
  },
  TOKEN: {
    NOTFOUND: 'Token not found',
  },
  USERS: {
    BLACKLISTED: 'User has been blacklisted',
    INCORRECT_CREDENTIALS: 'Incorrect credentials',
    NOT_VERIFIED: 'Please verify your account',
    NOTFOUND: 'User not found',
    OLD_PASSWORD: `Don't use already used password`,
    SUSPENDED: 'User account has been temporarily suspended',
    EMAIL: {
      ALREADY_VERIFIED: 'Email address is already verified',
      EXISTS: 'Email already exists',
      FAILED_TO_VERIFY: 'Failed to verify email',
      INVALID_FORMAT: 'Enter a valid email address',
      MIS_MATCH: `The given email mismatches with the user's registered email`,
      REQUIRED: 'Email is required',
      TYPE_STRING: 'Email must be a string',
      VERIFY: 'Verify your email address to continue',
    },
    FIRST_NAME: {
      LENGTH:'First name should contain minimum 3 and maximum of 30 characters',
      MATCHES: 'First name can contain alphanumeric but not only numbers',
      REQUIRED: 'First name is required',
      TYPE_STRING: 'First name must be a string',
    },
    LAST_NAME: {
      LENGTH: 'Last name should contain minimum 3 and maximum of 30 characters',
      MATCHES: 'Last name can contain alphanumeric but not only numbers',
      REQUIRED: 'Last name is required',
      TYPE_STRING: 'Last name must be a string',
    },
    PASSWORD: {
      INCORRECT_PASSWORD: 'Incorrect phone number or password',
      INVALID_FORMAT: 'Password must contain at least 10 characters, including uppercase, lowercase, number and special character',
      LENGTH: 'Password should contain minimum 10 and maximum of 60 characters',
      REQUIRED: 'Password is required',
      TYPE_STRING: 'Password must be a string',
    },
    PHONE_NUMBER: {
      ALREADY_EXIST: 'Phone number is already exists',
      ALREADY_VERIFIED: 'Phone number is already verified',
      DOES_NOT_EXIST: 'Phone number does not exist',
      INVALID_FORMAT: 'Enter a valid phone number',
      LENGTH: 'Phone number should contain minimum 10 and maximum of 12 numbers',
      MIS_MATCH: `The given phone number mismatches with the user's registered phone number`,
      NOTFOUND: 'Given phone number is not found',
      REQUIRED: 'Phone number is required',
      TYPE_NUMBER: 'Phone number must be a number',
      VERIFY: 'Verify your phone number to continue',
    },
    USERNAME: {
      ALREADY_EXISTS: 'Username already exists',
      LENGTH: 'Username should contain minimum 3 and maximum of 50 characters',
      MATCHES: 'Username should contain only alphanumeric',
      REQUIRED: 'Username is required',
      TYPE_STRING: 'Username must be a string',
    },
  },
};
