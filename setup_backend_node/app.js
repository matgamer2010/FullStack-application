import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
})); 
app.use(bodyParser.json());

app.post("/Login", async (request, res)=>{
  const {user, password} = request.body;
  console.log("Dados recebidos do front:", {user, password});

  try{
    const response = await fetch("http://127.0.0.1:8000/forms/process_login/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({user, password}),
    })
    const contentType = response.headers.get('content-type');
    if(contentType && contentType.includes('application/json')){
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      const text = response.text();
      console.warn("Resposta não JSON recebida pelo Django -->", text)
      res.status(response.status).send(text);
    }

  } catch (error){
    console.log("Status recebido do Django:", response.status )
    console.log("Ocorreu um erro ao se comunicar com o Django", error);
    res.status(500).json({error: "There was an error with the request"})
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
      const text = response.text();
      console.warn("Resposta não JSON recebida pelo Django -->", text)
      res.status(response.status).send(text);
    }
  }catch(error){
    console.log("Status recebido do Django: ", response.status);
    console.log("Ocorreu um erro ao se comunicar com o Django: ", error);
    res.status(500).json({error: "There was an error with the send of the Register Form"});
  }
});



app.listen(port, ()=>{
  console.log(`Servidor na porta: ${port}`)
});
