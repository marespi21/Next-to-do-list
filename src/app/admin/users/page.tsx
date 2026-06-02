"use client"
import { useRouter } from "next/navigation";

const AdminUsers = () => {

    const router = useRouter();

    const goBack = () => {
        router.back()
    }

    const goHome = ()=>{
        router.push("/")
    }

    return (
        <div>
        <h1>Administración de ususarios</h1>
  
        <div>Tabla</div>
  
          <button className="btn-back mr-2.5" onClick={goBack} > Back </button>
          <button className="btn-back" onClick={goHome}> Home </button>
        </div>
    )
}

export default AdminUsers;