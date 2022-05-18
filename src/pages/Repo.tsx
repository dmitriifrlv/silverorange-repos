import { useParams } from 'react-router-dom';

export function Repo() {
  const { repoId } = useParams();

  return <p>{repoId}</p>;
}
