require("dotenv").config();

import express from "express";
import axios from "axios";
import redis from "redis";
import { promisify } from "util";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const BASE_URL = process.env.OXFORD_DICTIONARY_API_URL as string;
const APP_ID = process.env.APP_ID as string;
const APP_KEY = process.env.APP_KEY as string;
const LANGUAGE_CODE = "en-us";
const headers = {
    "app_id": APP_ID,
    "app_key": APP_KEY
};

const client = redis.createClient(6379);

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

app.get("/lemmas", async (req, res) => {
    if(!req.query.word) {
        return res.sendStatus(400);
    }

    const wordId = (req.query.word as string).toLowerCase();

    const reply = await GET_ASYNC(`lemmas/${wordId}`);
        
    if(reply) {
        res.status(200).json(JSON.parse(reply));
        return;
    }

    await axios.get(`${BASE_URL}/lemmas/${LANGUAGE_CODE}/${wordId}`, {
        headers
    })
    .then(response => response.data)
    .then( async (data) => {
        await SET_ASYNC(`lemmas/${wordId}`, JSON.stringify(data))
        .then((result) => {
            console.log("data cached!", result);
        }).catch((error) => console.log("error: ", error));

        res.status(200).json(data);
    }).catch((error) => {
        res.status(500).json({
            message: error.message,
            error
        });
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server is running.")
});