import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"



export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
    }),
    createProject: builder.mutation({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
    }),
    updateProject: builder.mutation({
      query: ({ id, ...project }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: project,
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})