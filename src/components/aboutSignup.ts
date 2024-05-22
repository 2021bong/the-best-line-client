import { signUp, updateName, verifyEmail } from '@/api/auth';

async function createUser(email: string, pw: string, name: string) {
  try {
    const user = await signUp(email, pw);

    try {
      await updateName(name, user);

      try {
        const auth = await verifyEmail();
        return { result: true, user, auth };
      } catch (error) {
        return error;
      }
    } catch (error) {
      return error;
    }
  } catch (error) {
    return error;
  }
}

function getErrorMessage(error: any) {
  return error;
}

export { createUser, getErrorMessage };
