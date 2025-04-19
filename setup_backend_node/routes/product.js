import {prisma} from "../src/prisma";
import redis from "../src/redis";
import express from "express";

const router = express.Router();

router.get('/products', async (request, res) =>{
    try{
        const products = await prisma.products.findMany();
        res.json(products);
    } catch{
        res.status(500).json({error: "Ther was an error with the request"})        
    }
});

router.get('/products', async (request, response) =>{
    const cachedProducts = await redis.get('products');

    if(cachedProducts){
        console.log('Dados da requisição foram capturados com o Redis')
        return response.json(JSON.parse(cachedProducts));
    }

    const products = await prisma.product.findMany();
    await redis.set('products', JSON.stringify(products), 'EX', 120);
    console.log("Dados do Prisma (prismaMM)");
    response.json(products);
});

export default router;