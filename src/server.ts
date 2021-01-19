import * as express from 'express';
import {userRoute, categoryRoute, productRoute} from './app/routes/index';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import {MongoConnect} from './app/db/db';
import * as Helmet from 'helmet';
import * as compression from 'compression';



dotenv.config();

var app = express();
app.use(Helmet());
app.use(compression());

// app.get('/', (req, res) => res.send('This is gset API'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());



app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);

app.listen(process.env.PORT || 3000, ()=> {
    MongoConnect.connect().then((res)=> console.log('DB connected'));
    console.log('server running on port 3000')
});