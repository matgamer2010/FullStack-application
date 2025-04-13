"use client";
import {useState, useEffect} from "react";

function Cards(){

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const url = process.env.API_URL;
        fetch(url)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.log(error));
    }, []);
    
    return(
        <section className="section_cards box-border">

            <div className="flex flex-col justify-center items-center md:underline md:underline-offset-2 decoration-3 decoration-indigo-100 m-5">
                <p className="p-4 font-sans font-light text-3xl md:text-8xl">Veja o nosso
                    <a className=" 
                    bg-gradient-to-r 
                    from-sky-700
                    to-indigo-800 bg-clip-text mx-2 md:mx-5
                    transition ease-in-out duration-900 hover:bg-gradient-r hover:from-indigo-800 hover:to-purple-600
                    font-sans font-light text-transparent md:text-8xl text-3xl ">catálogo:</a>
                </p> 
            </div>

            <section>
                {product.map((item) =>{
                    return(
                        <div key={item.id} className=" 
                        bg-gray-100 rounded shadow-lg shadow-sky-500 m-20 mt-10 p-5 w-fit 
                        grid-cols-1 gap-4  transition duration-700 ease-in-out hover:scale-105 hover:shadow-xl 
                        cursor-pointer  hover:translate-5 hover:skew-3
                        hover:shadow-sky-700 ">

                            <img src={item.image} className="rounded"/>

                            <h1 className="text-2xl mt-5 w-auto h-auto">{item.name}</h1>

                            <p className="my-5 text-2xl"> R$ {item.price}</p>

                            <button onClick={() => window.location.href="http://localhost:8000/APICrud/"} className="
                            text-white bg-indigo-600 p-3 rounded shadow-lg transition duration-700 ease-in-out 
                            hover:scale-105 hover:animate-pulse  

                            cursor-pointer">Comprar</button>

                        </div>
                    );
                })}
            </section>
        </section>
    );
}

export default Cards;