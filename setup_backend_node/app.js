import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';

const app = express();
const port = 3001;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
})); 
app.use(bodyParser.json());

app.post("/Login", async (request, res) => {
    const { user, password } = request.body;
    console.log("Dados recebidos do front:", { user, password });

    try {
        const response = await fetch("http://localhost:8000/api/token/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user, password }),
        });
        console.log(reponse.json());

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log(reponse);
            res.status(response.status).json(data);
        } else {
            const text = await response.text();
            console.warn("Resposta não JSON recebida pelo Django -->", text);
            res.status(response.status).send(text);
        }
    } catch (error) {
        console.log("Ocorreu um erro ao se comunicar com o Django", error);
        res.status(500).json({ error: "There was an error with the request" });
    }
});


app.post("/Cadastro/", async (request, res) => {
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
    try {
        request.user = jwt.verify(token, process.env.SIMPLE_JWT_SECRET);
        next();
    } catch {

        return response.status(401);
    }
};

app.post("/UserInfo", verifyToken, async (req, res) => {

    try {
        const request = await fetch("http://127.0.0.1:8000/process_users/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: req.user})
        });
        const response = await request.json();
        return res.status(response.status).json(response);

    } catch(err) {
        return res.status(500).json({ error: "There was an error with the request", details: err.message });
    }
});

app.post("/refresh", async (req, res) => {
    const takeRefreshToken = req.headers.authorization;
    if (!takeRefreshToken) return res.status(401).json({ error: "No token provided" });

    const refreshToken = takeRefreshToken.split(" ")[1];

    try {
        const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken })
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (err) {
        return res.status(401).json({ error: "Invalid refresh token", details: err });
    }
});



app.listen(port, ()=>{
  console.log(`Servidor na porta: ${port}`)
});
