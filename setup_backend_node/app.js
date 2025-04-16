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
    const response = await fetch("http://localhost:8000/forms/login/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //
      },
      body: JSON.stringify({user, password}),
    })
    .then((response) => response.json())
    .then(data => {
      if(data.Success){
        res.status(200).json(data);
        // Develop Logic after login
      } else{
        res.status(404).json(data);
      }
    })
    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error){
    console.log("Ocorreu um erro ao se comunicar com o Django", error);
    res.status(500).json({error: "There was an error with the request"})
  }
})

app.listen(port, ()=>{
  console.log(`Servidor na porta: ${port}`)
});
