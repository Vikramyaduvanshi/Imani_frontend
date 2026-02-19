import { useContext } from "react"
import { Authcontext } from "../context/Authcontext"
import { User_navbar } from "./User_Navbar"
import { Admin_navbar } from "./Admin_navbar"

   

   export function Navbar(){

let {user} = useContext(Authcontext)
console.log("navbar",user)

    return (

<>
{user?.role=="admin" ?<Admin_navbar/>  : <User_navbar/> } 




</>

    )
   }