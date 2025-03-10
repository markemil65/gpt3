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
        const messages = [
            {
                role: 'user',
                content: req.query.message || ' '
            }
        ];

        const response = await gptx.ChatCompletion(messages);
        res.json({ data: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});