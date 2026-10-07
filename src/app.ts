import express, { Application, Request, Response } from "express";
import carRoutes from './routes/cars';
import { loggingMiddleware } from './middleware/logging.middleware';
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";



export const app: Application = express();

app.use(loggingMiddleware);


app.use(express.json());

app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);


app.use('/api/v1/cars', carRoutes);

app.get("/ping", async (_req: Request, res: Response) => {
     res.json({

          message: "hello from Martin"

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












