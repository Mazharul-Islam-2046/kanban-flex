import { ITask } from "@/models/Task";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
    }),
    tagTypes: ["Task"],
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], void>({
            query: () => `/tasks`,
            providesTags: ["Task"],
        }),
        getTaskById: builder.query<ITask, string>({
            query: (id) => `/tasks/${id}`,
            providesTags: ["Task"],
        }),
        createTask: builder.mutation<ITask, Partial<ITask>>({
            query: (task) => ({
                url: "/tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Task"],
        }),
        updateTask: builder.mutation<ITask, { id: string; updates: Partial<ITask> }>({
            query: ({ id, updates }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: updates,
            }),
            invalidatesTags: ["Task"],
        }),
    }),
});


export default taskApi;
export const { useGetTasksQuery, useGetTaskByIdQuery, useCreateTaskMutation, useUpdateTaskMutation } = taskApi;