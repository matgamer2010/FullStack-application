"use client";
import { useEffect, useState } from "react";
import { Link } from "next-navigation";
import Header from "../Components/header";


export default function Main() {

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const takeAccessToken = localStorage.getItem("access");
        const takeRefreshToken = localStorage.getItem("refresh");

        async function getProducts() {
            const requestProductsUserInfo = await fetch("http://localhost:3001/UserHistory", {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json", 'authorization': `Bearer ${takeAccessToken}`
                },
            });

            if (requestProductsUserInfo.ok) {
                const data = await requestProductsUserInfo.json();
                setProduct(data);
            }
        }

        getProducts();
            
    }, [])

    if (!product) return <p> Você ainda não tem nenhuma compra realizada, <Link> <p>que tal faze a sua primeira? </p> </Link></p>
    console.log("Veja as compras realizadas pelo usuário: ", product);
    return (
        <>
            <Header h1="M&M vendedores" />
            <section>
                {product.map((products) => {
                    return (
                        <h1 key={products.Product}>Nome: {products.Product}</h1>,
                        <img key={products.Product} src={products.Image}></img>,
                        <p key={products.Product}>Valor: {products.Value}</p>,
                        <p key={products.Product}> Quantidade: {products.Amount} </p>,
                        <p>Data da compra: {products.Date}</p>,
                        <p>Comprada por: {products.User}</p>
                    );
                })}
            </section>
        </>
    );
}