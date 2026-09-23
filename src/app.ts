import express, { Application, Request, Response } from "express";
import carRoutes from './routes/cars';
import { env } from "./config/env";
import { connectDB } from "./config/database";

const PORT = env.port



const app: Application = express();


app.use((req, _res, next) => {

     console.log(`${req.method} ${req.originalUrl}`);

     next();

});

app.use(express.json());


app.use('/api/v1/cars', carRoutes);

app.get("/ping", async (_req: Request, res: Response) => {
     res.json({

          message: "hello from Martinfdsafdfdsafdsa "

     });

});



app.get('/bananas', async (_req: Request, res: Response) => {

     res.json({

          message: "this is bananas gfgfds",

     });

});



app.get('/pineapples', async (_req: Request, res: Response) => {

     res.json({

          message: "this is pineapples",

     });

});

app.get('/fun', async (_req: Request, res: Response) => {

     res.json({

          message: "this is fun - really ???",

     });

});





const startServer = async () => {
     await connectDB();

     app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
     });

};

startServer();



