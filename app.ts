import axios from "axios"
import readline from "readline"
import "dotenv/config"

const apiKey:string = process.env.API_KEY || "your-api-key"
const url:string = "https://www.googleapis.com/youtube/v3/search"

const commandReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function searchVideo(queryWord: string ,maxResult: number) {
    const response = await axios.get(url ,{
        params: {
            part: "snippet",
            maxResults: maxResult,
            q: queryWord,
            key: apiKey
        }
    })

    return response.data.items.map((item: any) => ({
        title: item.snippet.title,
        description: item.snippet.description,
        videoId: item.id.videoId,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high.url,
        release: item.snippet.publishedAt
    }))
}

commandReader.question("Enter your keyword (Keyword ,Max result): ", (inp) => {
    // how to type command input as example;
    // enter your keyword (Keyword ,Result Count): unity tutorials/10
    // type your keyword follow slash and enter your max result

    const [query ,maxResult] = inp.split("/");

    searchVideo(query ,parseInt(maxResult)).then((response: Response) => {
        console.log(response);
    }).catch((err) => {
        console.error(err);
    })
    commandReader.close();
})
