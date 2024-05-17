import Logo from '@/components/Logo';
import InputForm from '@/components/InputForm';

export default function Login() {
  return (
    <div>
      <Logo />
      <h3 className='logo_font sub_title'>로그인</h3>
      <InputForm owner='login' />
    </div>
  );
}
