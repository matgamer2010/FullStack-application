"use client";
import { useEffect, useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer"; 
import Link from "next/link";

export default function User() {

    const user = localStorage.getItem("user");
    if (!user) return <section className="flex flex-col justify-center items-center text-2xl my-100 ">
        <p> Demorando muito?</p>
        <Link href="/">

            <p className="my-5 text-gray-400 hover:underline focus:underline"> Voltar para a Home page </p>

        </Link>
        <p> Ou</p>
        <Link href="/Login"> <p className="text-sky-400 hover:underline focus:underline" > sem login?, para a Login page</p> </Link>
    </section>;


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
                </div>

            </section>
        </>
    );
}
