import { signUp, updateName, verifyEmail } from '@/api/auth';

async function createUser(email: string, pw: string, name: string) {
  const user = await signUp(email, pw);
  await updateName(name, user);
  const auth = await verifyEmail();
  return { result: true, user, auth };
}

function getErrorMessage(msg: string) {
  switch (msg) {
    case 'auth/email-already-in-use':
      return '동일한 이메일이 존재합니다. 이메일을 다시 설정해주세요.';
    default:
      return '에러가 발생했습니다. 다시 시도해주세요.';
  }
}

export { createUser, getErrorMessage };
