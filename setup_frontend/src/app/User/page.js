"use client";
import { useEffect, useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer"; 
import Link from "next/link";

export default function User() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("access");
        const refreshToken = localStorage.getItem("refresh");

        console.log(`Valor de accessToken: ${accessToken} \n \n valor de refreshToken: ${refreshToken} `);
        if (!accessToken && !refreshToken || accessToken === undefined && refreshToken === undefined) {
            console.log("Sem tokens");
            window.location.href = "/Login";
            return;
        }

        const fetchUser = async () => {
            try {
                console.log("Tentando buscar os dados do usuario");
                const res = await fetch("http://localhost:3001/UserInfo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${accessToken}`,
                    }
                });
                console.log("O access token foi enviado");
                if (res.status === 401 && refreshToken) {
                    const refreshRes = await fetch("http://localhost:3001/refresh", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${refreshToken}`,
                        },
                    });

                    if (refreshRes.ok) {
                        const newTokens = await refreshRes.json();
                        localStorage.setItem("access", newTokens.access);
                        localStorage.setItem("refresh", newTokens.refresh || refreshToken);
                        console.log("Tokens atualizados com sucesso."); 

                        const retryRes = await fetch("http://localhost:3001/UserInfo", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "authorization": `Bearer ${newTokens.access}`,
                            },
                        });
                        const userData = await retryRes.json();
                        setUser(userData);
                    } else {
                        console.log("sla");
                    }
                } else if (res.ok) {
                    console.log(res);
                    const userData = await res.json();
                    console.log("Dados do usuario:", userData);
                    setUser(userData)   
                } else {
                    console.log(res.status);
                    console.log(res);
                    throw new Error("Erro ao buscar dados do usuario");
                }

            } catch (err) {
                console.error("Erro:", err);
            }
        };

        fetchUser();
    }, []);

    if (!user) return <section className="flex flex-col justify-center items-center text-2xl my-100 line-clamp-1">
        <p> Carregando.... </p>
        <Link href="/">

            <p className="my-5 text-sky-400 hover:underline focus:underline"> Voltar para a Home page </p>

        </Link>
    </section>;


    console.log("Passamos pela verificacao e temos um valor para user, veja: ", user);
    return (
        <>
            <Header h1="M&M vendedores" />
            <section className="flex justify-center items-center box-border md:my-30">
                <div className="mt-30 md:m-10 w-fit p-10 md:p-25 rounded text-black shadow-2xl md:text-3xl">

                    <h1>Seja bem vindo {user.username} !</h1>
                    <p className="lg:text-xl lg:my-3 my-5 font-light underline
                    underline-offset-2 decoration-sky-200
                    "
                    >Veja dados acerca da sua conta:</p>


                    <div>
                        <Link href="/PaymentsHistory">
                            <h2 className="bg-sky-500 text-white rounded-full scale-80 p-2 transition focus:bg-sky-600 hover:bg-sky-600 justify-left text-center">Ver minhas compras</h2>
                        </Link>
                    </div>
                </div>

            </section>
        </>
    );
}
