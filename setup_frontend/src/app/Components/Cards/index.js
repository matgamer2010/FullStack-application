"use client";
import {useState, useEffect} from "react";

function Cards(){

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const url = "http://localhost:8000/APICrud/?format=json";
        fetch(url)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.log(error));
    }, []);
    
    return(
        <section className="section_cards box-border">
            <h1 className="font-sans font-light text-4xl  underline underline-offset-4 m-10">Veja o Nosso catálogo:</h1>
            <section>
                {product.map((item) =>{
                    return(
                        <div key={item.id} className="bg-sky-50 rounded shadow-lg shadow-sky-500 m-10 p-5 w-fit 
                        grid-cols-1 gap-4  transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer
                        hover:shadow-sky-700 ">
                            <img src={item.image} className="rounded"/>
                            <h1 className="text-2xl mt-5 w-auto h-auto">{item.name}</h1>
                            <p className="my-5 text-2xl"> R$ {item.price}</p>
                            <button onClick={() => window.location.href="http://localhost:8000/APICrud/"} className="text-white bg-indigo-700 p-3 rounded shadow-lg transition duration-500 ease-in-out hover:scale-105 hover:opacity-75 
                            cursor-pointer">Comprar</button>
                        </div>
                    );
                })}
            </section>
        </section>
    );
}

export default Cards;