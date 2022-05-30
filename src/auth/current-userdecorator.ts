import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/users/models/user.model";

export const getCurrentUserByContext = (context: ExecutionContext): User => {
  if(context.getType() === 'http') {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }

  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();
  return req.user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
  }
)