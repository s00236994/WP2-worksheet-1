import { Request, Response } from 'express';

export class CarController {

  getCars = async (_req: Request, res: Response): Promise<void> => {

    res.status(200).json({ success: true, 
      data: "this is just dummy for now a response to the get all cars request" });
  };


  getCarById = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the get car by id request with car id ${req.params.id}` });
  };

  createCar = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the create car request the data received in the request body is: ${JSON.stringify(req.body)}` });
  };

  updateCar = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the update car by id request with car id ${req.params.id}` }); 
  };

  deleteCar = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the delete car by id request with car id ${_req.params.id}` }); 
  };
}
