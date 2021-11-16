import React, { useState } from 'react'
import './form.css';


export default function Form()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allEntry, setAllEntry] = useState([]);
    const submitForm = () =>{
        const newEntry = {email:email, password:password};
        setAllEntry([...allEntry, newEntry]);
        console.log(email, password);

    }
    return (
        <section style={{backgroundColor: 'blue'}}>
        <form action = "" onSubmit = {submitForm}>
            <div>
                <label htmlFor = "email">Email </label>
                <input type = "text"  name ="email" id = "email" value = {email} onChange = {(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor = "password">Password </label>
                <input type = "text"  name ="password" id = "password"  value = {password} onChange = {(p)=>setPassword(p.target.value)} />
            </div>
            <button>Log In</button>
           
            
        </form>
        </section>
    )
}