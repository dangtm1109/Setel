"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.use(bodyParser.json());
        router.post('/payment', (req, res) => {
            res.json({ message: Math.floor(Math.random() * 2) });
        });
        this.express.use('/', router);
    }
}
const app = new App();
exports.default = app.express;
