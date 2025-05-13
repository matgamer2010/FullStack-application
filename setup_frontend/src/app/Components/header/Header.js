"use client";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';



export function Header(props) {

    const router = useRouter();
    async function sendSearch(event) {
        event.preventDefault();
        const data = event.target.value;
        console.log("O usuario requisitou: ", data);

        const body = { search: data };
        const request = await fetch("http://127.0.0.1:8000/forms/process_search/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        const getReturnProducts = await request.json();
        if (getReturnProducts.ok) {
            localStorage.setItem("productsSearch", request);
        }
    } 

    return(
        <section>
            <div className="flex items-center justify-center bg-slate-50 relative box-border 
            rounded m-auto p-10 shadow-lg font-bold scale:90
            md:mt-5 md:mx-5 sm:mt-3 sm:mx-3 ">

                <Link href="/" legacyBehavior>
                    <h1 className="cursor-pointer text-stone-900 scale-60 transition duration-200 ease-out hover:scale-110 hover:translate-y-1 text-xl lg:text-2xl font-sans
                    lg:mx-5 md:mx-5 md:scale-100 md:ml-1 md:text-stone-800">{props.h1}</h1>
                </Link>

                <form onSubmit={(event) => sendSearch(event)}>

                    <input placeholder="Pesquise por algo" className="border-2 border-indigo-900 border-double bg-slate-100 
                    h-8 text-xs scale-90 rounded w-25 placeholder:text-center 
                    lg:p-1 lg:mx-5 md:mx-5 lg:text-lg md:scale-100 md:w-100" />

                </form>

                <Link href="Login/" legacyBehavior>
                    <a className="text-center text-white  w-20 bg-indigo-500 scale-80 text-shadow-md/20 
                        radius-2 rounded-sm mx-1/3 shadow-lg transition duration-200 ease-out hover:scale-110 hover:translate-y-1 hover:animate-pulse 
                        focus:scale-110 focus:translate-y-1 focus:animate-pulse
                        p-2
                        md:mx-3 md:scale-100">Login</a>
                </Link>
                                    
                <Link href="Register/" legacyBehavior>
                    <a className="text-center text-white w-20 bg-indigo-500 scale-80 text-shadow-md/20 
                        radius-2 rounded-sm mx-1/3 shadow-lg transition duration-200 ease-out hover:scale-110 hover:translate-y-1 hover:animate-pulse p-2
                        focus:scale-110 focus:translate-y-1 focus:animate-pulse
                        md:scale-100 md:mx-3">Cadastro</a>
                </Link>

                <Link href="User/">
                    <img src="https://github.com/matgamer2010.png" className="w-12 h-12 mx-3/2 mr-5 rounded-full cursor-pointer scale-80 border-2 
                    border-solid border-gray-300 transition duration-200 ease-out hover:scale-110 hover:translate-y-1 shadow-lg 
                    lg:ml-5 md:ml-5 md:scale-100 "></img>
                </Link>


            </div>
        </section>
    );
}