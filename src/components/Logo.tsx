import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <h1 className='logo_font title'>최고의 한 줄</h1>
    </Link>
  );
}
