import * as express from 'express';
import {userRoute, categoryRoute,
    productRoute, errorLogRoute,
    wishlistRoute, cartRoute,
    orderRoute} from './app/routes/index';
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
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
    next();
  });
  

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());



app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use("/errorLog", errorLogRoute);
app.use("/wishlist", wishlistRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.listen(process.env.PORT || 3000, ()=> {
    MongoConnect.connect().then((res)=> console.log('DB connected'));
    console.log('server running on port 3000')
});