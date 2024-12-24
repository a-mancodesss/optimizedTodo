import TodoForm from "@/component/TodoForm";
import Image from "next/image";
import { getData } from "./actions";
import { prisma } from "../lib/prisma"

export default async function Home() {
  return (
    <div className=" flex flex-col items-center mt-32 max-h-screen py-2 w-full">
      {/* todo form using reactquery  */}
      <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  bg-clip-text text-transparent">Todo App - ReactQuery + Prisma</h1>
      <h2 className="bg-gradient-to-r from-red-500 to-orange-500 font-extralight text-xl sm:text-2xl bg-clip-text text-transparent">By Aman</h2>
     <TodoForm/>

    </div>
  );
}
