import { data } from "./data";
export async function GET(){
    return Response.json(data)
}
export async function POST(req:Request){
    const post=await req.json();
    const newPost={
        name:post.name,
        age:post.age,
        intrest:post.intrest
    }
    data.push(newPost)
    return Response.json(newPost)
}
