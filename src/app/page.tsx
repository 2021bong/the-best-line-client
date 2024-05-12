import MainLogon from '@/app/MainLogon';
import MainLogin from './MainLogin';

export default function Home() {
  const isLogin = false;
  return <div>{isLogin ? <MainLogon /> : <MainLogin />}</div>;
}
