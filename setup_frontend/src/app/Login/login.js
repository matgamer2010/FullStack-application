"use client";
import {useState} from "react";
import { useRouter } from "next/navigation";
import Header from "../Components/header";
import axios from "axios";
import Messages from "../Components/Messages";

function Inputs(props){
    return(
        <div className="md:my-10">
            <h2 className="font-light underline underline-offset-2 decoration-sky-200">{props.h2}</h2>
            <input required className="placeholder:text-gray-500 placeholder:italic placeholder:text-xl 
            placeholder:text-center border-1 border-indigo-300
            md:border-2 m-3" onChange={props.onChange} placeholder={props.placeholder} type={props.type || "text"} value={props.value} disabled={props.Disabled}/>
        </div>
    );
}

export function Main(){
    
    // States for POST 
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    // States for Styles
    const [classForm, setClassForm] = useState("");
    const [disabled, setDisabled] = useState(false);
    const styledSection = "mt-30 md:m-10 w-fit p-10 md:p-25 rounded text-black shadow-2xl md:text-3xl"
    
    const router = useRouter();
    const sendInfo = async (event)=>{
        setClassForm("mt-30 md:m-10 w-fit p-10 md:p-25 rounded text-black shadow-2xl md:text-3xl animate-pulse blur-sm select-none")
        setDisabled(true);
        event.preventDefault();
        console.log(event);

        const data = {
            user: user,
            password:password,
        }

        try{
            console.log("Antes do post para o Express");
            const response = await axios.post("http://localhost:3001/Login", data, {validateStatus: () => true});
            if(response.status === 200){
                console.log("O status foi 200.")
                router.push(`/?message=${encodeURIComponent(response.data.Success)}&type=Success`)
            } else{
                console.log(`O status foi diferente de 200, veja: ${response.status}`);
                setClassForm("");
                setDisabled(false);
                router.push(`/Login/?message=${encodeURIComponent(response.data.ERROR)}&type=ERROR`)
            } 
        } catch(err){
            console.log("Houve um erro:", err.response?.data || err.message );
        }
        console.log(data);    
    }

    return(
        <section>
            <Header h1="M&M vendedores" />
            <Messages/>
            <form onSubmit={(event)=>{sendInfo(event)} }>
                <section className="flex justify-center items-center box-border">

                    <div className={classForm || styledSection}>
                        <h1 className="md:mb-10 text-center font-sans font-light text-shadow-lg/10">Login</h1>

                        <Inputs onChange={(event)=> {setUser(event.target.value)} } h2="Usuário" placeholder="Digite seu usuário" value={user} Disabled={disabled} />
                        <Inputs onChange={(event)=> {setPassword(event.target.value)} } h2="Senha" placeholder="Digite sua senha" value={password} type="password"  Disabled={disabled}/>

                        <button className="bg-indigo-600 font-light text-white rounded p-2 w-full shadow-2xl hover:opacity-75
                        cursor-pointer transition ease-out 
                        duration-500 hover:scale-105">Entrar</button>

                    </div>
                </section>
            </form>
        </section>
    );
}