import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetRepoByIdQuery } from '../services/service';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Loader, ErrorMessage } from '../components';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const README_CONTAINER = styled.div`
  padding: 0 16px;
`;

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
            `Unexpected error: ${error?.message}, please try again later`
          );
        });
    }
  }, [data?.full_name]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorMessage />;
  }
  return repoId && isSuccess && data ? (
    <main>
      <nav>
        <Button onClick={() => navigate('/')} variant="contained">
          Go Home
        </Button>
      </nav>

      <div>
        <p>
          The most recent commit date -
          {new Date(data.updated_at).toLocaleString()}
        </p>
      </div>
      <README_CONTAINER>
        {mdxData ? (
          <ReactMarkdown children={mdxData} />
        ) : mdxError ? (
          mdxError
        ) : null}
      </README_CONTAINER>
    </main>
  ) : null;
}
