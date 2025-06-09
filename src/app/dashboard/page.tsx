import Link from "next/link";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { ButtonSignOut } from "./_components/button-signout";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){ // verfica se existe usuario session
    redirect("/")
  }

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-2">Página dashboard</h1>
      <h3>Usuário: {session!.user.name}</h3>
      <h6>E-mail: {session!.user.email}</h6>
      <h6 className="absolute bottom-10 right-10">ID: <span className="bg-red-500 tracking-widest rounded-md px-3 py-2 text-white text-[10px]">{session!.user.id}</span></h6>
      
      <Link 
        href="/dashboard/profile"
        className="p-2 bg-blue-600 px-3 rounded-md text-white my-3">Perfil</Link>
      <div className="absolute top-10 right-10">
        <ButtonSignOut />
      </div>
    </div>
  );
}