"use client"

import { useRouter } from "next/navigation";
import React, {useState} from "react";

const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setFormData((prevState)=>({
            ...prevState,
            [name]: value,
        }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("")
        const res = await fetch("/api/Users", {
            method: "POST",
            body: JSON.stringify({ formData }),
            "content-type": "application/json",
        });
        
        if (!res.ok){
            const response = await res.json();
            setErrorMessage(response.message);
        }else {
            router.refresh();
            router.push("/")
        }
    };

    return (
        <div>
            <form 
              onSubmit ={handleSubmit}
              method="post"
              className="flex flex-col gap-3 w-1/2">
                
            <h1>Create New User</h1>
            <label>Full Name</label>
            <input
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.name}
                className="m-2 bg-slate-500 rounded"
             />
            <label>Email</label>
            <input
               id="email"
               name="email"
               type= "text"
               required={true}
               onChange={handleChange}
               value={formData.email}
               className="m-2 bg-slate-500 rounded"
             />
        <label>Password</label>
        <input 
              id="password"
              name="password"
              type="password"
              required={true}
              onChange={handleChange}
              value ={formData.password}
              className="m-2 bg-slate-500 rounded"
            />
        <input 
            type="submit"
            value="Create User"
            className="bg-blue-200 hover:bg-blue-100"
            />
        </form>
        <p className="text-red-400">{errorMessage}</p>
        </div>
    );
};

export default UserForm;