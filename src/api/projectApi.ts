// src/services/projectApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProject } from '@/models/Project';

// Define a base query with the base URL
const baseQuery = fetchBaseQuery({ 
  baseUrl: '/api/projects',
  prepareHeaders: (headers) => {
    // You can add auth headers here if needed
    return headers;
  },
});

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery,
  tagTypes: ['Project'], // For cache invalidation
  endpoints: (builder) => ({
    // Get all projects
    getProjects: builder.query<IProject[], void>({
      query: () => '/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Project' as const, id: _id })),
              { type: 'Project', id: 'LIST' },
            ]
          : [{ type: 'Project', id: 'LIST' }],
    }),

    // Get a single project by ID
    getProjectById: builder.query<IProject, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),

    // Create a new project
    createProject: builder.mutation<IProject, Partial<IProject>>({
      query: (projectData) => ({
        url: '/',
        method: 'POST',
        body: projectData,
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),

    // Update a project
    updateProject: builder.mutation<IProject, { id: string; updates: Partial<IProject> }>({
      query: ({ id, updates }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),

    // Delete a project
    deleteProject: builder.mutation<IProject, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Project', id },
        { type: 'Project', id: 'LIST' },
      ],
    }),

    // Add a member to a project
    addProjectMember: builder.mutation<IProject, { projectId: string; userId: string }>({
      query: ({ projectId, userId }) => ({
        url: `/${projectId}/members`,
        method: 'POST',
        body: { userId },
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: 'Project', id: projectId },
      ],
    }),

    // Remove a member from a project
    removeProjectMember: builder.mutation<IProject, { projectId: string; userId: string }>({
      query: ({ projectId, userId }) => ({
        url: `/${projectId}/members`,
        method: 'DELETE',
        body: { userId },
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: 'Project', id: projectId },
      ],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddProjectMemberMutation,
  useRemoveProjectMemberMutation,
} = projectApi;