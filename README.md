PH Tour Management Frontend 

Part-1

  1. Initial frontend project setup
  2. Making folder setup
  3. Add Navbar and Footer


Part-2

  1. Implementing Dark Theme Toggle
  2. Refactoring Layout
  3. Integrating React Hook Form with ShadCN Components
  4. Form Validation Using Zod
  5. Building the User Registration Form
  6. Enhancing Password and Confirm Password Components
  7. Setting Up Redux for State Management
  8. Configuring Axios and Creating axiosBaseQuery
  9. Handling User Account Creation
  10. Understanding the Registration Flow with Verification
  11. Visualizing axiosBaseQuery Payload and Router State


Part-3
  1. Configuring Axios and Creating axiosBaseQuery
  2. Sending OTP Code with Type-Safe RTK Query Mutation
  3. Handling useEffect Cleanup, Reset Button Functionality, For OTP Reset Functionality
  4. Accessing Cookies on the Client Side
      Front-End: 
        baseURL: config.baseUrl,
        withCredentials: true,
      Backend: 
        httpOnly: true,
        secure: true,
        sameSite: "none"
        
  5. Login with google by using this line  'onClick={() => window.open(`${config.baseUrl}/auth/google`)}' 
     And add this "req.cookies.accessToken" 
     const accessToken = req.headers.authorization || req.cookies.accessToken;

     in the back end code to get the /user/me (user info) it allows us to prevent set accessToken In header. I will pick it from cookies

  6. Consuming Authenticated User Data in the Client and Understanding Cache Invalidation, Auto Refetching, and apiStateReset Mechanism

      By using dispatch(authApi.util.resetApiState()): https://redux-toolkit.js.org/rtk-query/api/created-api/api-slice-utils 
      It will remove all the auth related data such as cookies in real time without reloading   page. 

Part-4
  1. Setting Up the Dashboard and Admin Routes

  2. Generating Routes Dynamically from Sidebar Items create generateRoutes.ts under utils and looping 2 times

  3. Rendering Sidebar Items Based on User Role by creating getSidebarItems.ts and switch case condition under utils

  4. UX and Performance Enhancements with Lazy Loading 
     const Analytics = lazy(() => import("@/pages/admin/Analytics"))
    
  5. Implementing Route Authorization via Higher-Order Components (HOC) 
     creating withAuth.tsx file under utils and manage some logic over there.
     And use this function in the route file index.ts 
     "Component: withAuth(DashboardLayout, role.superAdmin as TRole),"

  6. Adding 'Tour Type' Feature and Updating the Corresponding Backend Endpoint
     and use 'providesTags' and 'invalidatesTags' for render data without loading

     