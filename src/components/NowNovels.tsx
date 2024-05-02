// todo : server components vs client components
function getNowNovels() {
  // todo : 서버에서 소설 5줄을 받아와서 보여줌 + 소설 5줄 api 필요
  // const res = await fetch(`https://...`, { cache: 'no-store' });
  // const projects = await res.json();

  return [
    { id: '1', text: '여름이었다.' },
    { id: '2', text: '가을이었다.' },
    { id: '3', text: '봄이었다.' },
    { id: '4', text: '겨울이었다.' },
    { id: '5', text: '그것이 인간의 긍지다.' },
  ];
}

export default function NowNovels() {
  const novels: Novels[] = getNowNovels();
  return (
    <div className='border divide-y divide-gray-300'>
      <p className='my-2'>...</p>
      {novels.map((novel) => (
        <p key={novel.id} className='my-2'>
          {novel.text}
        </p>
      ))}
    </div>
  );
}

interface Novels {
  text: string;
  id: string;
}
