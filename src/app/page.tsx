'use client';

import MainLogin from './MainLogin';
import Main from './Main';
import getToken from '@/components/getToken';

export default function Home() {
  // todo : refactor - context로 만들어서 감싸서 사용
  const auth = getToken();

  if (!auth) {
    return <MainLogin />;
  }

  return (
    <div>
      <Main />
    </div>
  );
}
