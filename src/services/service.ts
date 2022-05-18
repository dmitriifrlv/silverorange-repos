import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Repo } from '../models/Repo';

const baseUrl = process.env.reposUrl;

export const reposApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllRepos: builder.query<Repo[], void>({
      query: () => `repos`,
    }),
  }),
});

export const { useGetAllReposQuery } = reposApi;
