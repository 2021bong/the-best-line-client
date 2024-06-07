import getFireStore from '@/components/getFireStore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

getFireStore();

// 회원가입
export async function signUp(email: string, password: string) {
  const auth = getAuth();
  const createResult = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).then((userCredential) => userCredential.user);

  return createResult;
}

// 회원가입하면서 이름 설정
export async function updateName(name: string, user: User) {
  const auth = getAuth();
  let updateResult = null;
  if (user) {
    if (auth.currentUser) {
      updateResult = await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }
  }
  return updateResult;
}

// 이메일 인증
export async function verifyEmail() {
  const auth = getAuth();
  const actionCodeSettings = {
    url: 'http://localhost:3000/signup/finish',
    handleCodeInApp: true,
  };
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser, actionCodeSettings);
  }
  return auth;
}

// todo : userCredential 저장 위치 변경, 서버랑 어떻게 통신할지 확인
// 로그인
export async function login(email: string, password: string) {
  const auth = getAuth();
  const userData: User = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).then((userCredential) => userCredential.user);
  return userData;
}

// 로그아웃
export function logOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
