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
    }),
});




export default taskApi