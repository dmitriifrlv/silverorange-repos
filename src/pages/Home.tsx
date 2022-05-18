import { useGetAllReposQuery } from '../services/service';
import { useNavigate } from 'react-router-dom';
import { Repo } from '../models/Repo';

export function Home() {
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, data } = useGetAllReposQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }
  return data && isSuccess ? (
    <ul>
      {JSON.parse(JSON.stringify(data))
        .sort(function (a: Repo, b: Repo) {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        })
        .map((repo: Repo) => {
          return (
            <li key={repo.id} onClick={() => navigate(`${repo.id}`)}>
              {repo.name} {repo.description} {repo.language} {repo.forks_count}{' '}
              *{repo.created_at}*
            </li>
          );
        })}
    </ul>
  ) : null;
}
