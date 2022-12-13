import { logger } from "../lib/logger";
import { userNameWithFallback } from "../lib/username";
const email = {
  subject: () => 'Verify Email',
  htmlBody: user => {
    const link = `${process.env.DOMAIN}/verification?verifyToken=${user.verifyToken}`;
    const appName = process.env.APP_NAME;
    if (process.env.NODE_ENV === 'development') {
      logger.debug(link);
    }
    return `
        <div> Hi ${userNameWithFallback(user)}, </div>
        <p>Please find below a link to verify your email for the ${appName}:</p>
        <a href="${link}">${link}</a>
        <p>If you did not request this action, please ignore this email.</p>
      `;
  }
};
export { email };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJ1c2VyTmFtZVdpdGhGYWxsYmFjayIsImVtYWlsIiwic3ViamVjdCIsImh0bWxCb2R5IiwidXNlciIsImxpbmsiLCJwcm9jZXNzIiwiZW52IiwiRE9NQUlOIiwidmVyaWZ5VG9rZW4iLCJhcHBOYW1lIiwiQVBQX05BTUUiLCJOT0RFX0VOViIsImRlYnVnIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBpL3NyYy9lbWFpbHMvdXNlci12ZXJpZmljYXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBVc2VyIH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy9saWIvbG9nZ2VyJ1xuaW1wb3J0IHsgdXNlck5hbWVXaXRoRmFsbGJhY2sgfSBmcm9tICdzcmMvbGliL3VzZXJuYW1lJ1xuXG5jb25zdCBlbWFpbCA9IHtcbiAgc3ViamVjdDogKCkgPT4gJ1ZlcmlmeSBFbWFpbCcsXG4gIGh0bWxCb2R5OiAodXNlcjogVXNlcikgPT4ge1xuICAgIGNvbnN0IGxpbmsgPSBgJHtwcm9jZXNzLmVudi5ET01BSU59L3ZlcmlmaWNhdGlvbj92ZXJpZnlUb2tlbj0ke3VzZXIudmVyaWZ5VG9rZW59YFxuICAgIGNvbnN0IGFwcE5hbWUgPSBwcm9jZXNzLmVudi5BUFBfTkFNRVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICBsb2dnZXIuZGVidWcobGluaylcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2PiBIaSAke3VzZXJOYW1lV2l0aEZhbGxiYWNrKHVzZXIpfSwgPC9kaXY+XG4gICAgICAgIDxwPlBsZWFzZSBmaW5kIGJlbG93IGEgbGluayB0byB2ZXJpZnkgeW91ciBlbWFpbCBmb3IgdGhlICR7YXBwTmFtZX06PC9wPlxuICAgICAgICA8YSBocmVmPVwiJHtsaW5rfVwiPiR7bGlua308L2E+XG4gICAgICAgIDxwPklmIHlvdSBkaWQgbm90IHJlcXVlc3QgdGhpcyBhY3Rpb24sIHBsZWFzZSBpZ25vcmUgdGhpcyBlbWFpbC48L3A+XG4gICAgICBgXG4gIH0sXG59XG5cbmV4cG9ydCB7IGVtYWlsIH1cbiJdLCJtYXBwaW5ncyI6IkFBRUEsU0FBU0EsTUFBTTtBQUNmLFNBQVNDLG9CQUFvQjtBQUU3QixNQUFNQyxLQUFLLEdBQUc7RUFDWkMsT0FBTyxFQUFFLE1BQU0sY0FBYztFQUM3QkMsUUFBUSxFQUFHQyxJQUFVLElBQUs7SUFDeEIsTUFBTUMsSUFBSSxHQUFJLEdBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxNQUFPLDZCQUE0QkosSUFBSSxDQUFDSyxXQUFZLEVBQUM7SUFDakYsTUFBTUMsT0FBTyxHQUFHSixPQUFPLENBQUNDLEdBQUcsQ0FBQ0ksUUFBUTtJQUVwQyxJQUFJTCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0ssUUFBUSxLQUFLLGFBQWEsRUFBRTtNQUMxQ2IsTUFBTSxDQUFDYyxLQUFLLENBQUNSLElBQUksQ0FBQztJQUNwQjtJQUVBLE9BQVE7QUFDWixtQkFBbUJMLG9CQUFvQixDQUFDSSxJQUFJLENBQUU7QUFDOUMsbUVBQW1FTSxPQUFRO0FBQzNFLG1CQUFtQkwsSUFBSyxLQUFJQSxJQUFLO0FBQ2pDO0FBQ0EsT0FBTztFQUNMO0FBQ0YsQ0FBQztBQUVELFNBQVNKLEtBQUsifQ==