"use client";
import Header from "../Components/header/Header";
import { useState, useEffect } from "react";

export default function Register() {
    const [product, setProduct] = useState(null);

    const getProducts = localStorage.getItem("productsSearch");


    useEffect(() => {
        setProduct(getProducts);
    }, [getProducts])

    const SendInfoToDynamicPage = (ID) => {
        console.log(`Valor ID: ${ID}`);
        const encodedID = encodeURIComponent(ID);
        console.log(`Valor ID codificado: ${encodedID}`);
        router.push(`/Produtos/${encodedID}`);
    }

    if (!product) return <p> Carregando busca...</p> ;
    return (
        <>
            <Header h1="M&M vendedores" />
            <section>
                {product.map((item) => {
                    return (
                        <div key={item.name} className=" 
                        bg-gray-100 rounded shadow-lg shadow-sky-500 m-20 mt-10 p-5 w-fit 
                        grid-cols-1 gap-4  transition duration-700 ease-in-out hover:scale-105 hover:shadow-xl 
                        cursor-pointer  hover:translate-5 hover:skew-3
                        hover:shadow-sky-700 ">

                            <img src={item.image} className="rounded"/>

                            <h1 className="text-2xl mt-5 w-auto h-auto">{item.name}</h1>

                            <p className="my-5 text-2xl"> R$ {item.price}</p>

                            <button onClick={() => SendInfoToDynamicPage(item.id)} className="
                            text-white bg-indigo-600 p-3 rounded shadow-lg transition duration-700 ease-in-out 
                            hover:scale-105 hover:animate-pulse cursor-pointer">Comprar</button>

                        </div>
                    )
                }
                )}
            </section>
        </>
    );
}
