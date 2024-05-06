import FirstNovels from '@/components/FirstNovel';
import Link from 'next/link';

export default function Login() {
  return (
    <main>
      <h1 className='logo_font title'>최고의 한 줄</h1>
      <p className='logo_font sub_title'>
        ~릴레이 소설 쓰기~
        <br />
        명대사를 써보자!
      </p>
      <p className='orange mb-5 font-bold'>소설은 여기까지 진행됐어요</p>
      <FirstNovels />
      <Link href='/login'>
        <button className='button'>로그인하기</button>
      </Link>
    </main>
  );
}
