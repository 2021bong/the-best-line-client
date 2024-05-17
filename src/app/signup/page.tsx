import InputForm from '@/components/InputForm';
import Logo from '@/components/Logo';

export default function Signup() {
  return (
    <div>
      <Logo />
      <h3 className='logo_font sub_title'>회원가입</h3>
      <InputForm owner='signup' />
    </div>
  );
}
