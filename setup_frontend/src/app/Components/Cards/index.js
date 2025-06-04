"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 

function Cards(){

    const [ product, setProduct] = useState([]);
    const [ category, setCategory] = useState([]);
    const [ masculino, setMasculino] = useState(false);
    const [ feminino, setFeminino] = useState(false);
    const [ juvenil, setJuvenil] = useState(false);
    const [ adulto, setAdulto] = useState(false);
    const [ infantil, setInfantil] = useState(false);

    useEffect(() => {
        const url = "http://localhost:5039/Clothes/";
        fetch(url)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.log(error));
    }, []);

    const router = useRouter();

    const SendInfoToDynamicPage = (ID) => {
        console.log(`Valor ID: ${ID}`);
        const encodedID = encodeURIComponent(ID);
        console.log(`Valor ID codificado: ${encodedID}`); 
        router.push(`/Produtos/${encodedID}`);
    }

    function sendCategory(){
        console.log("Chegou no sendCategory");
        
        let productsToSend = [];

        if(masculino){
            productsToSend.push(product.filter(item => item.category === "Masculino"));
        } else if(feminino){
            productsToSend.push(product.filter(item => item.category === "Feminino"));
        } else if(juvenil){
            productsToSend.push(product.filter(item => item.category === "Juvenil"));
        } else if(adulto){
            productsToSend.push(product.filter(item => item.category === "Adulto"));
        } else if(infantil){
            productsToSend.push(product.filter(item => item.category === "Infantil"));
        }
        
        if(productsToSend.length > 0){
            setCategory([]);
        } else{
            setCategory(productsToSend);
        }
        /* 
            Aqui, tive a ideia de criar um array que armazene as categorias,
            depois fazemos uma iteracao, e filtramos em "product" os produtos
            que contenham a categoria do array, sempre verificando se ha
            algo dentro do array; por fim, usamos o setProduct para atualizar
            os produtos que queremos.

            Uma duvida que fiquei agora é como voltar o valor de product para 
            seu estado padrao, talvez seja melhor apenas criar um novo
            useState para as categorias.
        */
        
    }

    if(!product) return (<p>Carregando catálogo...</p>)

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

            <section className="flex items-center">

                <section className="mx-5 md:scale-100 scale-75 ">
                    <form onSubmit={(event) => sendCategory(event) }>
                        <div className="flex flex-center gap-2 outline w-fit p-2 rounded outline-gray-500">
                            <input onChange={(event) => { setMasculino(event.target.checked); sendCategory() } } className="appearance-none w-5 h-5 rounded-full border border-gray-400 checked:bg-sky-500 " type="checkbox"/>
                            <p className="text-xl">Masculino</p>
                        </div>

                        <div className="flex flex-center gap-2 outline w-fit p-2 rounded outline-gray-500 my-3">
                            <input onChange={(event) => { setFeminino(event.target.checked); sendCategory() } } className="appearance-none w-5 h-5 rounded-full border border-gray-400 checked:bg-sky-500 " type="checkbox" />
                            <p>Feminino</p>
                        </div>

                        <div className="flex flex-center gap-2 outline w-fit p-2 rounded outline-gray-500 mb-3">
                            <input onChange={(event) => { setJuvenil(event.target.checked); sendCategory() } } className="appearance-none w-5 h-5 rounded-full border border-gray-400 checked:bg-sky-500 " type="checkbox" />
                            <p>Juvenil</p>
                        </div>

                        <div className="flex flex-center gap-2 outline w-fit p-2 rounded outline-gray-500">
                            <input onChange={(event) => { setAdulto(event.target.checked); sendCategory() } } className="appearance-none w-5 h-5 rounded-full border border-gray-400 checked:bg-sky-500 " type="checkbox" />
                            <p>Adulto</p>
                        </div>

                        <div className="flex flex-center gap-2 outline w-fit p-2 rounded outline-gray-500 my-3">
                            <input onChange={(event)=> {setInfantil(event.target.checked); sendCategory() } } className="appearance-none w-5 h-5 rounded-full border border-gray-400 checked:bg-sky-500 " type="checkbox" />
                            <p>Infantil</p>
                        </div>
                    </form>
                </section>

                <section>
                    { product.map((item) =>{
                        return(
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
                        );
                    })}
                </section>

            </section>

        </section>
    );
}

export default Cards;