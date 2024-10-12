const express = require('express');
require('dotenv').config();
const cors = require('cors');

const TestRouter = require('./routes/test');
const UpdateRouter = require('./routes/updatedb');
const FindItemRouter = require('./routes/finditem');
const GodownStockRouter = require('./routes/stock');
const authRouter = require('./routes/auth');
const searchRouter = require('./routes/search');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    return res.send('Hello World!');
})

app.use('/test', TestRouter);
app.use('/update', UpdateRouter);
app.use('/finditem', FindItemRouter);
app.use('/gs', GodownStockRouter);
app.use('/auth', authRouter);
app.use('/search', searchRouter);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})