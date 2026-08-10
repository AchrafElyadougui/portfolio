import {  RouterProvider  } from 'react-router-dom'
import { router } from './routes'
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);
  return (
    <div  className='bg-[var(--color-background)] xl:px-[99px] px-5'>
      <RouterProvider router={router}/>
    </div>
  )
}
