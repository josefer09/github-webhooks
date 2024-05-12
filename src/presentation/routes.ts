import { Router } from "express";
import { GithubRoutes } from "./github/routes";
import { GithubSha256Middleware } from "./middleware/github-sha256.middleware";



export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        // Definir las rutas
        router.use(GithubSha256Middleware.verifySignature);
        router.use('/api/github', GithubRoutes.routes);

        return router;
    }
}