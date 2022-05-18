import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Repo } from '../models/Repo';

const baseUrl = process.env.REACT_APP_REPOS_URL;

export const reposApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllRepos: builder.query<Repo[], void>({
      query: () => `repos`,
    }),
  }),
});

export const { useGetAllReposQuery } = reposApi;
