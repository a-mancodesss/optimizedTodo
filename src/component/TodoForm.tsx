"use client"
import { addData, getData } from "@/app/actions"
import { Todo } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Check, Circle,  EditIcon, Loader, Trash } from "lucide-react"
import { useState } from "react"
import { useForm, SubmitHandler, set } from "react-hook-form"

type Inputs = {
  todo: string
}
export default  function TodoForm() {
  const [myTodo, setMyTodo] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  // const router = useRouter()
  const queryClient = useQueryClient()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        createPost(data.todo)
        setMyTodo('')
      }
      const {data:allTodos, isLoading:isLoadingData} =useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: getData,
      })
     const {mutateAsync:createPost,isPending:isAddingPost }= useMutation({
        mutationFn: addData,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] }); // Sync with server
        },
      }
      )


  return (
    <div className="main-wapper w-full">

    <div className="container flex flex-col max-w-xl mx-auto items-center justify-center  py-2">
        <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("todo")} className="input" type="text" value={myTodo} onChange={(e)=>setMyTodo(e.target.value)}  />
      {errors.todo && <span className="text-red-500">This field is required</span>}
      <input className="submit font-mont font-bold"  type="submit" disabled={isAddingPost}/>
    </form>
    </div>

    <div className="flex flex-col items-start w-full max-w-xs mx-auto mt-4">
      {isLoadingData && <Loader className="animate-spin" />}
      {allTodos?.map((todo) => (
      <div className="flex items-center w-full mb-2" key={todo.id}>
        {todo.completed ? (
        <Check onClick={() => setIsCompleted(!isCompleted)} className="cursor-pointer text-green-500" />
        ) : (
        <Circle onClick={() => setIsCompleted(!isCompleted)} className="cursor-pointer text-gray-500" />
        )}
        <div className="content flex-1 ml-4">{todo.todo}</div>
        <div className="modify flex items-center gap-4">
        <Trash className="cursor-pointer text-red-500" />
        <EditIcon className="cursor-pointer text-blue-500" />
        </div>
      </div>
      ))}
    </div>
    </div>


  )
}
