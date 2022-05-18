import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';

const LOADER_CONTAINER = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Loader() {
  return (
    <LOADER_CONTAINER>
      <CircularProgress />
    </LOADER_CONTAINER>
  );
}
