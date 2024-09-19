import { Controller, Delete, Get, Inject, Post, Put, Res, HttpStatus, Param, Body  } from '@nestjs/common';
import { Response } from 'express';
import Vehicle from 'src/domain/models/Vehicle';
import VehicleRepository from 'src/infra/repositories/VehiclesRepository/contracts/VehicleRepository';

@Controller('vehicles')
export class VehiclesController {
  constructor(
    @Inject('VehicleRepository')private readonly vehicleRepository: VehicleRepository,
  ) {}

    @Get()
    async findAll(@Res() res: Response) {
      const result = await this.vehicleRepository.findAll();
      if(!result){
        return res.status(HttpStatus.NOT_FOUND).json({message: 'No vehicles found'});
      }
      return res.status(HttpStatus.OK).json(result);
    }
    
    @Get(':id')
    async findOne(@Param() params: any, @Res() res: Response){
      const id = params.id;
      const result = await this.vehicleRepository.findById(Number(id));
      if(!result){
        return res.status(HttpStatus.NOT_FOUND).json({message: 'Vehicle not found'});
      }
      return res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async create(@Res() res: Response, @Body() vehicle : Vehicle) {

      if(!vehicle.placa || !vehicle.chassi || !vehicle.renavam || !vehicle.modelo || !vehicle.marca || !vehicle.ano){
        return res.status(HttpStatus.BAD_REQUEST).json({message: 'Missing required fields'});
      }

      const result = await this.vehicleRepository.create(vehicle);
      return res.status(HttpStatus.CREATED).json(result);
    }

    @Put(':id')
    async update(@Res() res: Response, @Body() vehicle : Vehicle) {
      const result = await this.vehicleRepository.update(vehicle.id, vehicle);
      if(!result){
        return res.status(HttpStatus.NOT_FOUND).json({message: 'Vehicle not found'});
      }
      return res.status(HttpStatus.OK).json(result);
    }

    @Delete(':id')
    async remove(@Param() params: any, @Res() res: Response){
      const id = params.id
      const result = await this.vehicleRepository.delete(Number(id));
      if(!result){
        return res.status(HttpStatus.NOT_FOUND).json({message: 'Vehicle not found'});
      }
      return res.status(HttpStatus.OK).json({id: id});
    }
}
