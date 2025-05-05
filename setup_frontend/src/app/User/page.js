"use client";
import { useEffect, useState } from "react";
import Header from "../Components/header";

export default function User() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("access");
        const refreshToken = localStorage.getItem("refresh");

        if (!accessToken && !refreshToken) {
            window.location.href = "/Login";
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:3001/UserInfo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${accessToken}`,
                    },
                });

                if (res.status === 401 && refreshToken) {
                    const refreshRes = await fetch("http://localhost:3001/refresh", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${refreshToken}`,
                        },
                    });

                    if (refreshRes.status === 200) {
                        const newTokens = await refreshRes.json();
                        localStorage.setItem("access", newTokens.access);
                        localStorage.setItem("refresh", newTokens.refresh || refreshToken);

                        const retryRes = await fetch("http://localhost:3001/UserInfo", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "authorization": `Bearer ${newTokens.access}`,
                            },
                        });
                        const userData = await retryRes.json();
                        setUser(userData);
                    } else {
                        window.location.href = "/Login";
                    }
                } else if (res.status === 200) {
                    const userData = await res.json();
                    setUser(userData);
                } else {
                    throw new Error("Failed to fetch user data");
                }

            } catch (err) {
                console.error("Erro ao buscar usuario:", err);
                window.location.href = "/Login";
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <Header />
            <section>
                <div>
                    <h1>{user?.username || "Carregando..."}</h1>
                </div>
            </section>
        </>
    );
}
