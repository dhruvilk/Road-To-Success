import { logger } from "../lib/logger";
import { userNameWithFallback } from "../lib/username";
const email = {
  subject: () => 'Forgot Password',
  text: user => {
    const link = `${process.env.DOMAIN}/reset-password?resetToken=${user.resetToken}`;
    const appName = process.env.APP_NAME;
    logger.debug(link);
    return `
        <div> Hi ${userNameWithFallback(user)}, </div>
        <p>Please find below a link to reset your password for ${appName}:</p>
        <a href="${link}">${link}</a>
        <p>If you did not request to reset your password, please ignore this email.</p>
      `;
  }
};
export { email };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJ1c2VyTmFtZVdpdGhGYWxsYmFjayIsImVtYWlsIiwic3ViamVjdCIsInRleHQiLCJ1c2VyIiwibGluayIsInByb2Nlc3MiLCJlbnYiLCJET01BSU4iLCJyZXNldFRva2VuIiwiYXBwTmFtZSIsIkFQUF9OQU1FIiwiZGVidWciXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcGkvc3JjL2VtYWlscy9mb3Jnb3QtcGFzc3dvcmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBVc2VyIH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy9saWIvbG9nZ2VyJ1xuaW1wb3J0IHsgdXNlck5hbWVXaXRoRmFsbGJhY2sgfSBmcm9tICdzcmMvbGliL3VzZXJuYW1lJ1xuXG5jb25zdCBlbWFpbCA9IHtcbiAgc3ViamVjdDogKCkgPT4gJ0ZvcmdvdCBQYXNzd29yZCcsXG4gIHRleHQ6ICh1c2VyOiBVc2VyKSA9PiB7XG4gICAgY29uc3QgbGluayA9IGAke3Byb2Nlc3MuZW52LkRPTUFJTn0vcmVzZXQtcGFzc3dvcmQ/cmVzZXRUb2tlbj0ke3VzZXIucmVzZXRUb2tlbn1gXG4gICAgY29uc3QgYXBwTmFtZSA9IHByb2Nlc3MuZW52LkFQUF9OQU1FXG5cbiAgICBsb2dnZXIuZGVidWcobGluaylcblxuICAgIHJldHVybiBgXG4gICAgICAgIDxkaXY+IEhpICR7dXNlck5hbWVXaXRoRmFsbGJhY2sodXNlcil9LCA8L2Rpdj5cbiAgICAgICAgPHA+UGxlYXNlIGZpbmQgYmVsb3cgYSBsaW5rIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmQgZm9yICR7YXBwTmFtZX06PC9wPlxuICAgICAgICA8YSBocmVmPVwiJHtsaW5rfVwiPiR7bGlua308L2E+XG4gICAgICAgIDxwPklmIHlvdSBkaWQgbm90IHJlcXVlc3QgdG8gcmVzZXQgeW91ciBwYXNzd29yZCwgcGxlYXNlIGlnbm9yZSB0aGlzIGVtYWlsLjwvcD5cbiAgICAgIGBcbiAgfSxcbn1cblxuZXhwb3J0IHsgZW1haWwgfVxuIl0sIm1hcHBpbmdzIjoiQUFFQSxTQUFTQSxNQUFNO0FBQ2YsU0FBU0Msb0JBQW9CO0FBRTdCLE1BQU1DLEtBQUssR0FBRztFQUNaQyxPQUFPLEVBQUUsTUFBTSxpQkFBaUI7RUFDaENDLElBQUksRUFBR0MsSUFBVSxJQUFLO0lBQ3BCLE1BQU1DLElBQUksR0FBSSxHQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsTUFBTyw4QkFBNkJKLElBQUksQ0FBQ0ssVUFBVyxFQUFDO0lBQ2pGLE1BQU1DLE9BQU8sR0FBR0osT0FBTyxDQUFDQyxHQUFHLENBQUNJLFFBQVE7SUFFcENaLE1BQU0sQ0FBQ2EsS0FBSyxDQUFDUCxJQUFJLENBQUM7SUFFbEIsT0FBUTtBQUNaLG1CQUFtQkwsb0JBQW9CLENBQUNJLElBQUksQ0FBRTtBQUM5QyxpRUFBaUVNLE9BQVE7QUFDekUsbUJBQW1CTCxJQUFLLEtBQUlBLElBQUs7QUFDakM7QUFDQSxPQUFPO0VBQ0w7QUFDRixDQUFDO0FBRUQsU0FBU0osS0FBSyJ9