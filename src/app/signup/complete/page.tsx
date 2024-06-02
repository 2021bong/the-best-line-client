import Logo from '@/components/Logo';
import Link from 'next/link';

export default function Complete() {
  return (
    <div>
      <Logo />
      <div>회원가입이 완료되었습니다.</div>
      <div>가입하신 이메일로 이메일 인증을 완료하세요!</div>
      <Link href='/login'>
        <button className='button filled'>메인으로</button>
      </Link>
    </div>
  );
}
