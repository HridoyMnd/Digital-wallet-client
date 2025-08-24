import { baseApi } from "../baseApi";

 const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        // user registration endpoint
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                body: userInfo
            })
        }),

        // user login endpoint
        login: builder.mutation({
            query: (data) => {
                console.log(data);
                return {
                url: "/auth/login",
                method: "POST",
                body: data
            }
            }
        })
    })
})


 export const { useRegisterMutation, useLoginMutation } = authApi; 
