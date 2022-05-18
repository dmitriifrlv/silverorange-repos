import { useState } from 'react';
import { useGetAllReposQuery } from '../services/service';
import { useNavigate } from 'react-router-dom';
import { Repo } from '../models/Repo';

export function Home() {
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, data } = useGetAllReposQuery();
  const [filter, setFilter] = useState<string | null>(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }

  return data && isSuccess ? (
    <>
      <div>
        {[...new Set(data.map((item) => item.language))].map((language) => (
          <button onClick={() => setFilter(language)} key={language}>
            {language}
          </button>
        ))}
      </div>
      <ul>
        {JSON.parse(JSON.stringify(data))
          .sort(function (a: Repo, b: Repo) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          })
          .filter((repo: Repo) => (filter ? repo.language === filter : true))
          .map((repo: Repo) => {
            return (
              <li key={repo.id} onClick={() => navigate(`${repo.id}`)}>
                {repo.name} {repo.description} {repo.language}{' '}
                {repo.forks_count} *{repo.created_at}*
              </li>
            );
          })}
      </ul>
    </>
  ) : null;
}
