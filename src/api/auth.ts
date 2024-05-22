import getFireStore from '@/components/getFireStore';
import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
  Auth,
} from 'firebase/auth';

getFireStore();

// todo : 회원가입하면서 400에러 뜨는데 어디서 발생하는 건지 찾아야 함
// todo : 중간중간 에러 발생했을때(이미 존재하는 이메일 등) 페이지 이동 안하고 예외처리 필요
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

// todo : 회원가입 후 이메일 전송하여 인증하도록 수정 필요, 인증 완료 페이지 수정 필요
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

// todo : userCredential 저장 위치 확인, 서버랑 어떻게 통신할지 확인
// 로그인
export function login(email: string, password: string) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
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
