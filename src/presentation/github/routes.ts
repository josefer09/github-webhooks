import { Router } from "express";
import { GithubController } from "./controller";



export class GithubRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new GithubController();

        router.post('/', controller.webhookHandler);


        return router;
    }
}