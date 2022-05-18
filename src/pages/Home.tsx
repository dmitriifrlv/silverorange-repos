import { useState } from 'react';
import { useGetAllReposQuery } from '../services/service';
import { useNavigate } from 'react-router-dom';
import { Repo } from '../models/Repo';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import { ErrorMessage, Loader } from '../components';

export function Home() {
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, data } = useGetAllReposQuery();
  const [filter, setFilter] = useState<string | null>(null);

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    language: string | null
  ) => {
    setFilter(language);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorMessage />;
  }

  return data && isSuccess ? (
    <main>
      <Typography align="center" variant="h4">
        List of available repositories
      </Typography>
      <div>
        <ToggleButtonGroup
          value={filter}
          exclusive={true}
          onChange={handleFilter}
          aria-label="language filter"
        >
          {[...new Set(data.map((item) => item.language))].map((language) => (
            <ToggleButton
              key={language}
              value={language}
              aria-label="left aligned"
              disableRipple={true}
              size="small"
            >
              {language}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <List>
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
              <ListItem key={repo.id} disablePadding={true}>
                <ListItemButton onClick={() => navigate(`${repo.id}`)}>
                  <ListItemText
                    primary={`${repo.name} (${repo.language})
                 `}
                    secondary={`${repo.description ?? ''} ${
                      repo.description ? ',' : ''
                    } forked ${repo.forks_count} ${
                      repo.forks_count === 1 ? 'time' : 'times'
                    } `}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </main>
  ) : null;
}
