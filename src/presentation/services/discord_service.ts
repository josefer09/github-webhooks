import { envs } from "../../config";


export class DiscordService {

    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;
    constructor() {}

    async notify( message: string ) {
        const body = {
            content: message,
            embeds: [
                {
                    image: {url: 'https://media.giphy.com/media/l41lVsYDBC0UVQJCE/giphy.gif?cid=790b76119gglu3p59hujzugh4whj7mzqw21u78nkryi448t0&ep=v1_gifs_search&rid=giphy.gif&ct=g'}
                }
            ]
        }

        const response = await fetch( this.discordWebhookUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });

        if( !response.ok ) {
            console.log('Eror Sending message to discord');
            return false;
        }

        return true;
    }
}