"use client";
import { useEffect, useState } from "react";
import Header from "../../Components/header";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js"; 


function ProductPage({ params }) {
    const { id: EncodedID } = params;
    const [ product, setProduct ] = useState(null);

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    useEffect(() => {
        if (!EncodedID) return;

        try{
            const url = `http://localhost:8000/API/Crud/${decodeURIComponent(EncodedID)}/`;
            fetch(url)
                .then((response) => response.json())
                    .then((data) => setProduct(data) );

        } catch (e) {
            alert("houve um erro durante o carregamento das informacoes o erro e: \n", e.message);
        }
    }, [EncodedID]);

    const StripeCheckout = async () => {
        const url = "http://localhost:5039/Payments/create-checkout-session/";

        const data = {
            name: product.name,
            price: product.price,
            amount: product.amount,
        }
        try {
            console.log("Tentando fazer a requisicao para o backend");
            const request = await axios.post(url, data, { validateStatus: () => true });
            const { id: sessionId } = request.data;
            console.log("Requisicao feita com sucesso, e o id da sessao e: \n", sessionId);
            if (request.status == 200) {
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({ sessionId });
                if (error) {
                    console.error("Error:", error);
                }
            }
        } catch (e){
            console.log("Houve um erro, e o erro e: \n",e.message);
        }

    }

    if (!product) return (<p>Carregando...</p>);
    if (product.amount === 0) return alert("estoque esgotado, favor retornar para a pagina inicial");

    return (
        <>
            <Header h1="M&M vendedores" />
            <section>
                <div>
                    <img src={product.image} />
                    <h1>{product.name}</h1>
                    <p>{product.price}</p>
                    <select>
                        {[...Array(product.amount)].map((_, value) => (
                            <option key={value}>{ value+1 }</option>
                        ))}
                    </select>
                    <p>{product.description}</p>
                    <button className="bg-indigo-500 hover:bg-sky-500" onClick={() => { StripeCheckout() }}>Comprar</button>
                </div>
            </section>
        </>  
    );
}

export default ProductPage;
