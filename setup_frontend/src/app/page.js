"use client";
import { useEffect} from "react";
import Header from "./Components/header/";
import Cards from "./Components/Cards/";
import Footer from "./Components/footer/";
import Mid from "./Components/Mid/";

function Home() {

    useEffect(() => {
        const accessToken = localStorage.getItem("access");
        const refreshToken = localStorage.getItem("refresh");

        console.log(`Valor de accessToken: ${accessToken} \n \n valor de refreshToken: ${refreshToken} `);
        
        const fetchUser = async () => {
            try {
                console.log("Tentando buscar os dados do usuario");
                const res = await fetch("http://localhost:3001/UserInfo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${accessToken}`,
                    }
                });
                console.log("O access token foi enviado");
                if (res.status === 401 && refreshToken) {
                    const refreshRes = await fetch("http://localhost:3001/refresh", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${refreshToken}`,
                        },
                    });

                    if (refreshRes.ok) {
                        const newTokens = await refreshRes.json();
                        localStorage.setItem("access", newTokens.access);
                        localStorage.setItem("refresh", newTokens.refresh || refreshToken);
                        console.log("Tokens atualizados com sucesso.");

                        const retryRes = await fetch("http://localhost:3001/UserInfo", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "authorization": `Bearer ${newTokens.access}`,
                            },
                        });
                        const userData = await retryRes.json();
                        localStorage.setItem("user", userData.username);
                        console.log("Dados do usuario armazenados no localStorage:", userData.username);
                    } else {
                        console.log("err");
                    }
                } else if (res.ok) {
                    console.log(res);
                    const userData = await res.json();
                    console.log("Dados do usuario:", userData);
                    localStorage.setItem("user", userData.username);
                    console.log("Dados do usuario armazenados no localStorage:", userData.username);
                } else {
                    console.log(res.status);
                    console.log(res);
                    throw new Error("Erro ao buscar dados do usuario");
                }

            } catch (err) {
                console.error("Erro:", err);
            }
        };

        fetchUser();
    }, []);
  return (
    <section className="">
      <Header h1="M&M vendedores" />
      <Mid />
      <Cards />
      <Footer />
    </section>
  );
}

export default Home;