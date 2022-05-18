import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetRepoByIdQuery } from '../services/service';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Loader } from '../components/Loader';

export function Repo() {
  const navigate = useNavigate();
  const { repoId } = useParams();
  const { isLoading, isError, isSuccess, data } = useGetRepoByIdQuery(
    repoId as string
  );
  const [mdxData, setMdxData] = useState<any>(null);
  const [mdxError, setMdxDataError] = useState<any>(null);

  useEffect(() => {
    if (data?.full_name) {
      axios
        .get(
          `https://raw.githubusercontent.com/${data.full_name}/master/README.md`
        )
        .then(function (response) {
          setMdxData(response.data);
        })
        .catch(function (error) {
          setMdxDataError(
            `Unexpected error: ${JSON.stringify(error)}, please try again later`
          );
        });
    }
  }, [data?.full_name]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }
  return repoId && isSuccess && data ? (
    <div>
      <button onClick={() => navigate('/')}>Go Back</button>
      <header>{data.name}</header>

      <main>
        <div>
          <p>
            The most recent commit date -
            {new Date(data.updated_at).toLocaleString()}
          </p>
        </div>
        <div>
          <p>README</p>
          {mdxData ? (
            <ReactMarkdown children={mdxData} />
          ) : mdxError ? (
            mdxError
          ) : null}
        </div>
      </main>
    </div>
  ) : null;
}
