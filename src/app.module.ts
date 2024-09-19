import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesController } from './app/controllers/vehicles/vehicles.controller';
import VehicleMemoryRepository from './infra/repositories/VehiclesRepository/VehicleMemoryRepository';

@Module({
  imports: [],
  controllers: [AppController, VehiclesController],
  providers: [AppService, 
    {provide: 'VehicleRepository', useClass: VehicleMemoryRepository}
  ],
})
export class AppModule {}
