import { Request, Response } from "express";
import { GitHubService } from "../services/github_sevice";
import { DiscordService } from "../services/discord_service";



export class GithubController {

    constructor(
        private readonly gitHubService = new GitHubService(),
        private readonly discordService = new DiscordService(),
    ){}

    webhookHandler = ( req: Request, res: Response ) => {
        const githubEvent = req.header('x-github-event') ?? 'unknown'; // Son header personalizados
        //const signature = req.header('x-hub-signature-256') ?? 'unknown';
        const payload = req.body;
        let message: string;

        switch (githubEvent) {
            case 'star':
                message = this.gitHubService.onStart(payload);
                break;

            case 'issues':
                message = this.gitHubService.onIssue(payload);
                break;
        
            default:
                message = `Unknown event ${githubEvent}`
                break;
        }
        console.log({ message });

        this.discordService.notify(message)
        .then(() => res.status(202).send('Accepted'))
        .catch(() => res.status(500).json({ error: 'Internal server error' }))
    }
}