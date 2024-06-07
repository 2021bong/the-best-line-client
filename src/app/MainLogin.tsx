import LoginNovels from './LoginNovels';
import Link from 'next/link';
import Logo from '../components/Logo';

export default function MainLogin() {
  return (
    <main>
      <Logo />
      <p className='logo_font sub_title'>
        ~릴레이 소설 쓰기~
        <br />
        명대사를 써보자!
      </p>
      <p className='orange mb-5 font-bold'>소설은 여기까지 진행됐어요</p>
      <LoginNovels />
      <Link href='/login'>
        <button className='button'>로그인하기</button>
      </Link>
    </main>
  );
}
