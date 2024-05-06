import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

// todo : 회원가입 시 저장 가능 데이터 항목 확인 필요
// 회원가입
export function signUp(email: string, password: string) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

// todo : 회원가입 후 이메일 전송하여 인증하도록 수정 필요, 인증 완료 페이지 수정 필요
// 이메일 인증
export function verifyEmail() {
  const auth = getAuth();
  if (auth.currentUser) {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  }
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
