import Header from "@/components/header"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>

       <main className="min-h-screen  w-full px-[2%] py-2">
         
         <Header/>
         <Outlet/>
       </main>

       <div className="p-10 text-white bg-gray-800">
        Made with 💖
       </div>
    </div>
  )
}

export default AppLayout