import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((_data, req) => {
  return req.args ? req?.args[0]?.user : null;
});
