"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 

function Cards(){

    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState("");

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

    function searchByCategory() {

    /*
        Onde parei:

        Consegui fazer a pesquisa por categoria, tanto que ao fazer um log quando
        a condicional é positiva, podemos ver que foi encntrado o produto que queremos
        
        Mas aqui vem o ponto que não consegui entender, pois ao adicionar o "element"
        ele adiciona todos os produtos ao invés do pesquisado 
        (sei disso por causa do debugger na linha antes do return, 
        lá pude ver o retorno de um Objeto ). Por outro lado, não consegui identificar se  
        erro pode ser proeminente das múltiplas renderizações geradas pelo React (na estrutura
        interna há um componente que renderiza duas vezes uma ação), uma coisa que devo validar é se 
        há algum produto duplicado nessa lista de produtos, inclusive, devo fazer uma validação Clean
        no Django sobre isso.

        Porém tem outro ponto de vista, há varios produtos de uma mesma categoria, e esse loop
        abaixo vai definir apenas o último, ou seja, quando acabar de percorrer, devo
        fazer um setProduct() passando a lista de todos os produtos correspondentes à categoria.

    */
        product.forEach((element) => {
            element.category.forEach((categoryFromApi) => {
                if (category === categoryFromApi.name) {
                    console.log("Conseguimos verificar se temos um produto que corresponda à categoria desejada: ", element);
                    debugger;
                    setProduct(element);
                    console.log("Conseguimos verificar se temos um produto que corresponda à categoria desejada")
                } else {
                    console.log("asdas");
                }
            });
        });
    }

    const SelectCategory = (props) => {
        const isThereAnyCategoryAlreadySelect = category=== props.p ? true: false; 
        return (
            <div onClick={() => { setCategory(props.p); searchByCategory() }} className="flex flex-center gap-2 outline w-fit p-2 rounded outline-gray-500 my-3 checked:bg-sky-500">
                <input value={isThereAnyCategoryAlreadySelect} className="appearance-none w-5 h-5 rounded-full border border-gray-400 checked:bg-sky-500 p-4" type="checkbox" />
                <p>{ props.p }</p>
            </div>
        )
    }

    if (!product) return (<p>Carregando catálogo...</p>)
    console.log(product);
    debugger;
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
                    <form onSubmit={(event) => searchByCategory(event)}>
                        <SelectCategory p="Masculino" />
                        <SelectCategory p="Feminino" />
                        <SelectCategory p="Juvenil" />
                        <SelectCategory p="Adulto" />
                        <SelectCategory p="Infantil" />
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