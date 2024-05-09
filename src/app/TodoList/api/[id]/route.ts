import { data } from "../data";
export async function PATCH(
  req: Request,
  { params }: { params: { id: number } }
) {
  const body = await req.json();
  console.log(body.name);
  console.log(data[4].name);
  data[params.id].name = body.name;
  data[params.id].age = body.age;
  data[params.id].intrest = body.intrest;
  return Response.json("updated the array");
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  console.log(data[3]);
  data.splice(params.id, 1);
  return Response.json(data[params.id]);
}
