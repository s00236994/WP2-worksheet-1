import express, { Application, Request, Response } from "express";
import carRoutes from './routes/cars';
import { loggingMiddleware } from './middleware/logging.middleware';
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middleware/error.middleware";
import cors from "cors";



export const app: Application = express();

app.use(cors());

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

app.get("/pong", (_req : Request, res: Response) => {
    console.log("Received request to /pong");
    throw new Error("Simulated error in /pong route");
});

app.get("/pung", async (_req : Request, res: Response) => {
    console.log("Received request to /pung");
     throw new Error("Simulated error in /pung route");
});

app.use(errorHandler);













