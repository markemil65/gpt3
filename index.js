import express from 'express';
import { GPTx } from '@ruingl/gptx';

const app = express();
const port = 3000;
const gptx = new GPTx({
    provider: 'Nextway',
    model: 'gpt-3.5-turbo'
});

app.use(express.json());

app.get('/api', async (req, res) => {
    try {
        const startTime = Date.now();
        
        const messages = [
            {
                role: 'user',
                content: req.query.message || ' '
            }
        ];
        
        const response = await gptx.ChatCompletion(messages);
        
        const endTime = Date.now();
        const rtime = endTime - startTime;
        
        let time = "";
        if (rtime < 1000) {
            time = `${rtime}ms`;
        } else if (rtime < 60000) {
            time = `${(rtime / 1000).toFixed(2)}s`;
        } else if (rtime < 3600000) {
            time = `${(rtime / 60000).toFixed(2)}m`;
        } else {
            time = `${(rtime / 3600000).toFixed(2)}h`;
        }
        
        res.json({ 
            status: true, 
            response: response,
            rt: time
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
