import MainLogon from '@/components/MainLogon';
import MainLogin from '../components/MainLogin';

export default function Home() {
  const isLogin = false;
  return <div>{isLogin ? <MainLogon /> : <MainLogin />}</div>;
}
