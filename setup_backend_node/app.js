import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3001;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
})); 
app.use(bodyParser.json());

app.post("/Login", async (request, res) => {
    console.log(request.body);
        
    const { user, password } = request.body;

    console.log("Dados recebidos do front:", { user, password });


    try {
        const responseTokens = await fetch("http://127.0.0.1:8000/api/token/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user, password }),
        });

        const responseLogin = await fetch("http://127.0.0.1:8000/forms/process_login/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: user, password: password })
        });

        const contentType = responseTokens.headers.get('content-type');
        if (contentType && contentType.includes('application/json') && responseLogin.status === 200) {
            const data = await responseTokens.json();
            console.log("Dados que vieram do Django: ", data);
            res.status(responseTokens.status).json(data);
        } else {
            const text = await responseTokens.text();
            console.log("Resposta não JSON recebida pelo Django -->", text);
            res.status(responseTokens.status).send(text);
        }
    } catch (error) {
        console.log("Ocorreu um erro ao se comunicar com o Django", error.text() );
        res.status(500).json({ error: "There was an error with the request" });
    }
});

app.post('/LogOut', async (req, res) => {
    const getUser = JSON.parse(req.body);
    console.log("Valor de user --> ", getUser);
    try {
        const request = await fetch('http://127.0.0.1:8000/forms/process_logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: getUser
        })
        const data = await request.json();
        if (data.ok) {
            res.status(data.status).json(data);
        } else {
            res.status(data.status).json({ 'err': 'There was an error with the request' });
        }
    } catch (e) {
        console.log('Houve um erro no Logout, o erro é: ', e);
        res.status(500).json({ 'error': JSON.stringify(e) });
    }
})


app.post("/Cadastro", async (request, res) => {
  const {email, user, password, secondPassword} = request.body;
  console.log("Dados recebidos do Cadastro: ", {email, user, password, secondPassword});
  try{
    const response = await fetch("http://127.0.0.1:8000/forms/process_register/", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, user, password, secondPassword}),
    });
    const contentType = response.headers.get('content-type');
    console.log("Antes da validação do conteúdo");
    if(contentType && contentType.includes('application/json')){
      console.log("O conteúdo é JSON.")
      const data = await response.json();
      res.status(response.status).json(data);
    } else{
      const text = await response.text();
      console.warn("Resposta não JSON recebida pelo Django -->", text)
      res.status(response.status).send(text);
    }
  }catch(error){
    console.log("Status recebido do Django: ", response.status);
    console.log("Ocorreu um erro ao se comunicar com o Django: ", error);
    res.status(500).json({error: "There was an error with the send of the Register Form"});
  }
});

function verifyToken(request, response, next) {
    const auth = request.headers.authorization;
    if (!auth) return response.status(401).json({error: "Unauthorized"});
    const token = auth.split(" ")[1];

    console.log("Token: ", token);
    try {   
        request.user = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Token decifrado: ", request.user);
        next();
    } catch (e) {
        console.log("Houve algum erro no processamento do middleware, veja o motivo: ", e);
        return response.status(401);
    }
};

app.post("/UserInfo", verifyToken, async (req, res) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/forms/process_users/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: req.user })
        });

        let data;
        try {
            data = await response.json();
        } catch {
            const text = await response.text();
            data = { error: "Resposta não era JSON", body: text };
        }

        console.log(data);

        const statusCode = typeof response.status === "number" ? response.status : 500;
        return res.status(statusCode).json(data);

    } catch (err) {
        console.error("Erro na requisição ao Django:", err);
        return res.status(500).json({
            error: "Erro ao conectar com o backend Django",
            details: err.message
        });
    }
});

app.post("/refresh", async (req, res) => {
    const takeRefreshToken = req.headers.authorization;
    if (!takeRefreshToken) return res.status(401).json({ error: "No token provided" });

    const refreshToken = takeRefreshToken.split(" ")[1];
    console.log("Valor do refresh token vindo do frontend: ", refreshToken);

    try {
        const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken })
        });
        console.log(response);

        const data = await response.json();
        console.log("Dados recebidos do Django no token de refresh: ", data);
        return res.status(response.status).json(data);
    } catch (err) {
        console.error("Erro ao tentar atualizar o token: ", err);
        return res.status(401).json({ error: "Invalid refresh token", details: err });
    }
});

app.get("/UserHistory",verifyToken ,async (req, res) => {
    // Aqui nós enviamos o token para o Django para receber os produtos que o usuário comprou.
    try {
        const sendTokenAndGetInfo = await fetch("http://127.0.0.1:8000/forms/process_user_payments/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken: req.user })
        })

        if (sendTokenAndGetInfo.ok) {
            const data = await sendTokenAndGetInfo.json();
            console.log("Dados recebidos do Django: ", data);
            return res.status(sendTokenAndGetInfo.status).json(data);
        }
    } catch (e) {
        console.error("Erro ao tentar conectar com o Django: ", e);
        return res.status(500).json({ error: "Erro ao conectar com o backend Django", details: e.message });
    }
})


app.listen(port, ()=>{
  console.log(`Servidor na porta: ${port}`)
});
