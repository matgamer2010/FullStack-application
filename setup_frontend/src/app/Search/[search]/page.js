"use client";
import Header from "../../Components/header";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';

export default function Search() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [search, setSearch] = useState(null);

    const searchValue = params?.search;


    useEffect(() => {
        if (!searchValue || searchValue === "") {
            return (
                <section className="my-100">
                    <p className="flex justify-center items-center text-2xl">
                        Nenhuma pesquisa foi feita ainda...
                    </p>
                    <Link href="/">
                        <p className="flex flex-col  text-2xl text-center my-5 text-sky-500 focus:underline hover:underline">
                            Voltar para a home page
                        </p>
                    </Link>
                </section>
            );
        }

        const decodedSearch = decodeURIComponent(searchValue);
        setSearch(decodedSearch);

        async function sendProductToSearchUrl() {
            try {
                const response = await fetch('http://127.0.0.1:8000/forms/process_search/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ search: decodedSearch }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setProduct(data.results);
                } else {
                    console.log(response.status);
                    console.log(response.data);
                    console.log('Erro ao buscar produto');
                }
            } catch (e) {
                console.log(e);
            }
        }

        sendProductToSearchUrl();
    }, [searchValue]);

    const SendInfoToDynamicPage = (ID) => {
        const encodedID = encodeURIComponent(ID);
        router.push(`/Produtos/${encodedID}/`);
    }

    console.log(product);
    debugger;
    if (!product) return <>
        <Header h1="M&M vendedores"></Header>
        <section>
            <h1>Nenhum resultado para {searchValue} no momento</h1>
        </section>
    </>
    return (
        <>
            <Header h1="M&M vendedores" />
            <section>
                <h1 className="flex justify-center items-center my-5 text-4xl"> Resultados encontrados: </h1>
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
