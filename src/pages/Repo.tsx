import { useParams } from 'react-router-dom';
import { useGetRepoByIdQuery } from '../services/service';

export function Repo() {
  const { repoId } = useParams();
  const { isLoading, isError, isSuccess, data } = useGetRepoByIdQuery(
    repoId as string
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }
  return repoId && isSuccess && data ? <p>{data.name}</p> : null;
}
