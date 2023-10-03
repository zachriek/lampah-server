import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import fileUpload from 'express-fileupload';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);
app.use(cors());

app.use('/api/v1', routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
