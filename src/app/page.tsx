import Main from '@/components/Main';
import Login from './login/page';

export default function Home() {
  const isLogin = false;
  return <div>{isLogin ? <Main /> : <Login />}</div>;
}
