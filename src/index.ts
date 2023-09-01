import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
