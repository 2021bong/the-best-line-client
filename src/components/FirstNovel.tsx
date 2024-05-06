import Novels from './Novels';

// todo : server components vs client components
function getFirstNovels() {
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

export default function FirstNovels() {
  const novels = getFirstNovels();
  return <Novels novels={novels} ellipsis={true} />;
}
