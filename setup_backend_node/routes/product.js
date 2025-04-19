import {prisma} from "../src/prisma";
import redis from "../src/redis";
import express from "express";
import axios from "axios"

const router = express.Router();

// Redis deals with Products' requests
router.get('/products', async (request, response) =>{
    const cache = await redis.get("products");

    if(cache){
        return response.json(JSON.parse(cache));
    }

    const { data: requestAPI } = await axios.get("http://127.0.0.1:8000/products/");
    await redis.set("products", JSON.stringify(requestAPI), "EX", 90);
    return response.json(requestAPI);
});

// Prisma deals with others ways of requests

router.get('/users/', async (request, response) =>{
    const cachePrisma = await prisma.UserForCache.findMany();

    const now = new Date();
    const firstUser = cachePrisma[0];

    if(firstUser){
        const timeVerificate = (now- new Date(firstUser.cachedAt) / 1000);

        if(timeVerificate > 90){
            await prisma.UserForCache.deleteMany();
            // URL for Users
            const {data} = await axios.get("http://127.0.0.1:8000/users/");

            for(let user of data){
                await prisma.UserForCache.create({
                    data:{
                        name: user.name,
                        email: user.email,
                        cachedAt: now,
                    },
                });
                return response.json(data);
            }
        } else{
            return response.json(cachePrisma);
        }
    } else{
        const {data} = await axios.get("http://127.0.0.1:8000/users/");
        for(let user of data){
            await prisma.UserForCache.create({
                data:{
                    name: user.name,
                    email: user.email,
                    cachedAt: now,
                }
            })
        }
    }
});


export default router;