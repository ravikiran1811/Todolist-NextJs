"use client";
import axios from "axios";
import { useState, useEffect } from "react";
interface ListItem {
  name: string;
  age: string;
  intrest: string;
}
// eslint-disable-next-line @next/next/no-async-client-component
export default function TodoList() {
  const [list, setList] = useState<ListItem[]>([]);
  const [data, setData] = useState<ListItem>({
    name: "",
    age: "",
    intrest: "",
  });
  const [editIndex, setEditIndex] = useState(-1);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/TodoList/api");
      setList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleName = (e: any) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    if (editIndex < 0) {
      try {
        const response = await axios.post(
          "http://localhost:3000/TodoList/api",
          {
            name: data.name,
            age: data.age,
            intrest: data.intrest,
          }
        );
        console.log(data.name);
    
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.patch(
          `http://localhost:3000/TodoList/api/${editIndex}`,
          data

        );
      } catch (error) {
        console.log(error);
      }
      console.log( data)
      console.log(list[editIndex])
    }
    setData({
        name: "",
        age: "",
        intrest: "",
      });
      fetchData();
      setEditIndex(-1)
  };
  const onEdit = async (id: number) => {
    const itemToEdit = list.find((item, index) => index === id);
    if (!itemToEdit) {
      console.error("Item not found for editing");
      return;
    }
    setData({
      name: itemToEdit.name,
      age: itemToEdit.age,
      intrest: itemToEdit.intrest,
    });
    console.log(itemToEdit.name)
    setEditIndex(id);
  };
  const onDelete=async(id:number)=>{
    try {
        const response = await axios.delete(
          `http://localhost:3000/TodoList/api/${id}`

        );
      } catch (error) {
        console.log(error);
      }
      fetchData();
  }

  return (
    <div>
      <span>Name</span>
      <input type="text" name="name" value={data.name} onChange={handleName} />
      <span>Age</span>
      <input type="text" name="age" value={data.age} onChange={handleName} />
      <span>Intrest</span>
      <input
        type="text"
        name="intrest"
        value={data.intrest}
        onChange={handleName}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {list.map((item, index) => (
          <div
            key={index}
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid",
              width: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p>{item.name}</p>
            <p>{item.age}</p>
            <p>{item.intrest}</p>
            <button onClick={() => onEdit(index)}>Edit</button>
            <button onClick={()=>onDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
