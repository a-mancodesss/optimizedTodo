// app/actions.ts
"use server";
import { prisma } from "@/lib/prisma";
import { neon } from "@neondatabase/serverless";
//db connection
export async function connectToDB() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined");
    }
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT version()`;
    console.log('Connected to db successfully!!')
    return response[0].version;

  }
  //get data from db    
  export async function getData() {
    connectToDB()
    try{
        const allTodos = await prisma.todo.findMany()
        // console.log(allTodos)
        return allTodos
        }
        catch(err){
            console.log('Error in getting data',err)
            return []
        }
  }
    // add data to db
    export async function addData(todo:string) {
        connectToDB()
        try{
            // console.log(todo)
            // return ;
            const newTodo = await prisma.todo.create({
            data: { 
                todo:todo,
            }
         })
            console.log('Data added successfully!!',newTodo)
            return newTodo
        }
        catch(err){
            console.log('Error in adding data',err)
        }
    
    }
    