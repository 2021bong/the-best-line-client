import { signUp, updateName, verifyEmail } from '@/api/auth';

async function createUser(email: string, pw: string, name: string) {
  const user = await signUp(email, pw);
  if (!name) {
    name = makeRandomName();
  }
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

// todo : 추후 서버에서 하도록 수정
function makeRandomName() {
  const adjectives = [
    '성공한',
    '실패한',
    '매끄러운',
    '황당한',
    '기기묘묘',
    '칠전팔기',
    '장난하는',
    '천재적',
    '말라가는',
    '행복한',
    '정의로운',
  ];
  const nouns = [
    '초콜렛',
    '코끼리',
    '바나나',
    '원숭이',
    '외계인',
    '작가',
    '바보',
    '정수기',
    '게임기',
    '도전자',
    '도시락',
    '딸기',
    '오리',
    '산적',
  ];
  return (
    adjectives[Math.floor(Math.random() * adjectives.length)] +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

export { createUser, getErrorMessage };
