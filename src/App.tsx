import { Outlet } from "react-router"
import CommonLayout from "./components/layout/CommonLayout"
import { generateRoutes } from "./generateRoutes"

import { userSidebarItems } from "./routes/userSidebarItems"

function App() {
 console.log(generateRoutes(userSidebarItems), 'routes')

  return (
     <CommonLayout>
      <Outlet/>
    </CommonLayout>
  )
}

export default App


