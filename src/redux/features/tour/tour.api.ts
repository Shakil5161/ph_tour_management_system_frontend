import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createTour: builder.mutation({
            query: (tourData) => ({
                url: "/tour/create",
                method: "POST",
                data: tourData,
            }),
            invalidatesTags: ["TOUR"],
        }),
        createTourType: builder.mutation({
            query: (tourType) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourType,
            }),
            invalidatesTags: ["TOUR"],
        }),
      
        deleteTourType: builder.mutation({
            query: (tourId) => ({
                url: `/tour/tour-types/${tourId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TOUR"],
        }),
      
        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET"
            }),
            providesTags: ["TOUR"],
            transformResponse: (response) => response.data,   
        }),
    })
})

export const { 

    useCreateTourMutation,
    useCreateTourTypeMutation,
    useDeleteTourTypeMutation,
    useGetTourTypesQuery,
    

} = tourApi