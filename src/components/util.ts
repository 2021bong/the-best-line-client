function getErrorMessage(msg: string) {
  switch (msg) {
    case 'auth/email-already-in-use':
      return '동일한 이메일이 존재합니다. 이메일을 다시 설정해주세요.';
    case 'auth/invalid-credential':
      return '이메일 및 비밀번호를 확인해주세요.';
    default:
      return '에러가 발생했습니다. 다시 시도해주세요.';
  }
}

export { getErrorMessage };
