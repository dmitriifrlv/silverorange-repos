import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Repo } from '../models/Repo';

const baseUrl = process.env.REACT_APP_REPOS_URL;

export const reposApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllRepos: builder.query<Repo[], void>({
      query: () => `repos`,
    }),
    getRepoById: builder.query<Repo, string>({
      query: (id) => `repos/${id}`,
    }),
  }),
});

export const { useGetAllReposQuery, useGetRepoByIdQuery } = reposApi;
