import { IProject } from "@/models/Project";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getProjects: builder.query<IProject[], void>({
      query: () => "/projects",
      providesTags: (result) => {
        // Type guard to ensure result exists
        if (!result) return [{ type: "Project", id: "LIST" }];

        return [
          // Tag each individual project by its ID
          ...result.map((project) => ({
            type: "Project" as const,
            id: project._id ? project._id.toString() : "",
          })),

          // Tag the entire list
          { type: "Project", id: "LIST" },
        ];
      },
    }),
    getProjectById: builder.query<IProject, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) =>
        result
          ? [{ type: "Project", id: result._id ? result._id.toString() : "" }]
          : [{ type: "Project", id }],
    }),

    createProject: builder.mutation<IProject, Partial<IProject>>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: builder.mutation<
      IProject,
      { id: string; updates: Partial<IProject> }
    >({
      query: ({ id, updates }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Project", id },
        { type: "Project", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;

export default projectApi;
