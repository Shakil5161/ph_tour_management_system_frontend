import { baseApi } from "@/redux/baseApi";


export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createDivision: builder.mutation({
            query: (createDivision) => ({
                url: "/division/create",
                method: "POST",
                data: createDivision,
            }),
            invalidatesTags: ["DIVISION"],
        }),
      
        getDivision: builder.query({
            query: () => ({
                url: "/division",
                method: "GET"
            }),
            providesTags: ["DIVISION"],
            transformResponse: (response) => response.data,   
        }),
    })
})

export const { 

    useCreateDivisionMutation,
    useGetDivisionQuery,
    
} = divisionApi