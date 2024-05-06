export default function Novels({ novels, ellipsis }: NovelsProps) {
  return (
    <div className='border divide-y divide-gray-300'>
      {ellipsis && <p className='my-2'>...</p>}
      {novels.map((novel) => (
        <p key={novel.id} className='my-2'>
          {novel.text}
        </p>
      ))}
    </div>
  );
}

interface NovelsProps {
  novels: NovelType[];
  ellipsis: boolean;
}

interface NovelType {
  text: string;
  id: string;
}
