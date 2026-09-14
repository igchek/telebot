'use client';

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { persistor } from "@/store/store";
import { setUser } from "@/store/UserSlice";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const {data, isAuthenticated} = useAppSelector((state)=>state.user)
  const dispatch = useAppDispatch()

  const handleStart = async()=>{
    setLoading(true)

    const initialData = retrieveLaunchParams()
    console.log('initial data is',initialData)
    if (initialData.tgWebAppData?.user)
    {dispatch(setUser({
      id:initialData.tgWebAppData.user.id,
      first_name:initialData.tgWebAppData.user.first_name,
      last_name:initialData.tgWebAppData.user.last_name,
      username:initialData.tgWebAppData.user.username

    }))}
    try {
      await fetch('/api/auth/init', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(initialData)
      })
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Ошибка инициализации:', error)
      setLoading(false)
    }
  }

  return (
    <div
      className="
        flex w-full h-full items-center justify-center
        bg-white 
      "
    >
      {isAuthenticated && data ?
        <h1>Привет, {data.first_name}!</h1>
        :
      <button
        className={`
          w-[50%] h-[50%] rounded 
          ${loading?'bg-amber-500':'bg-green-500'}
          flex justify-center items-center text-white font-bold text-lg transition-all
          hover:${loading?`bg-amber-300`:`bg-green-300`}
        `}
        onClick={handleStart}
      >
        {isAuthenticated &&
          <button
            className="
              flex justify-center items-center text-white font-bold text-lg transition-all
              w-[50%] h-[50%] rounded 
              bg-red-600
            "
            onClick={()=>{
              persistor.purge().then(()=>{
                router.push('/')
              })
            }}
          >Reload</button>
        }
        {loading ? 'Запуск...' : 'START' }
      </button>
      }
      
    </div>
  );
}
