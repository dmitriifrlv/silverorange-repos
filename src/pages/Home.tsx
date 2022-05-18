import { useGetAllReposQuery } from '../services/service';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, data } = useGetAllReposQuery();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }
  return isSuccess && data ? (
    <ul>
      {data.map((item) => {
        return (
          <li key={item.id} onClick={() => navigate(`${item.id}`)}>
            {item.name}
          </li>
        );
      })}
    </ul>
  ) : null;
}
