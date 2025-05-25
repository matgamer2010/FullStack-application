"use client";
import { useEffect, useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer"; 
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function User() {

    const [user, setUser] = useState("");
    const router = useRouter();

    useEffect(() => {

        const user = localStorage.getItem("user");
        if (!user) return router.push('/Login');
        setUser(user)
    }, [router])

    if (user === null) {
        return <> <p className="flex items-center justify-center text-2xl flex-col">Sem Login...</p> <Link href="/Login"> <p className="flex items-center text-sky-500 text-2xl">gostaria de ir para a page de Login</p> </Link> </> 
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    async function makeLogOut() {
        try {
            const csrfToken = getCookie("csrftoken");
            console.log(csrfToken);
            const response = await fetch("http://localhost:8000/forms/process_logout/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CsrfToken': getCookie("csrftoken")
                },
                credentials: 'include'
            });

            if (response.status ===200) {
                router.push('/Login');
            } else {
                console.log(response.status)
                alert("Erro ao tentar desconectar-se.");
            }
        } catch (error) {
            console.error("Erro na requisicao de logout:", error);
            alert("Erro de conexao ao tentar fazer logout.");
        }
    }


    console.log("Passamos pela verificacao e temos um valor para user, veja: ", user);
    return (
        <>
            <Header h1="M&M vendedores" />
            <section className="flex justify-center items-center box-border md:my-30">
                <div className="mt-30 md:m-10 w-fit p-10 md:p-25 rounded text-black shadow-2xl md:text-3xl">

                    <h1>Seja bem vindo {user} !</h1>
                    <p className="lg:text-xl lg:my-3 my-5 font-light underline
                    underline-offset-2 decoration-sky-200
                    "
                    >Veja dados acerca da sua conta:</p>


                    <div>
                        <Link href="/PaymentsHistory">
                            <h2 className="bg-sky-500 text-white rounded-full scale-80 p-2 transition focus:bg-sky-600 hover:bg-sky-600 justify-left text-center">Ver minhas compras</h2>
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <button onClick={() => { makeLogOut() }} className="bg-red-400 text-white p-3 rounded-full scale-80 p-2 transition hover:opacity-75 hover:cursor-pointer justify-left text-center">Fazer LogOut</button>
                    </div>

                </div>

            </section>
        </>
    );
}
