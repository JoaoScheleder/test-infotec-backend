import Vehicle from "src/domain/models/Vehicle";
import VehicleRepository from "./contracts/VehicleRepository";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class VehicleMemoryRepository implements VehicleRepository{

    vehicles : Vehicle[] = [
        {
            id: 1,
            placa: "ABC-1234",
            chassi: "12345678901234567",
            renavam: "12345678901",
            modelo: "Uno",
            marca: "Fiat",
            ano: 2010
        },
        {
            id: 2,
            placa: "ABC-1234",
            chassi: "12345678901234567",
            renavam: "12345678901",
            modelo: "Uno",
            marca: "Fiat",
            ano: 2010
        },
        {
            id: 3,
            placa: "ABC-1234",
            chassi: "12345678901234567",
            renavam: "12345678901",
            modelo: "Uno",
            marca: "Fiat",
            ano: 2010
        },
    ];

    findAll() : Promise<Vehicle[]> {
        return Promise.resolve(this.vehicles)
    }

    findById(id : number) : Promise<Vehicle | undefined>{
        return Promise.resolve(this.vehicles.find(vehicle => vehicle.id === id));
    }

    create(vehicle : any) : Promise<Vehicle>{
        this.vehicles.push(vehicle);
        vehicle.id = this.findMaxId() + 1;
        console.log("VehicleMemoryRepository.create", vehicle);
        return Promise.resolve(vehicle);
    }

    delete(id : number) : Promise<number>{
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
        return Promise.resolve(id);
    }

    update(id: number, vehicle: Vehicle): Promise<Vehicle> {
        const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
        this.vehicles[index] = vehicle;
        return Promise.resolve(vehicle);
    }

    private findMaxId(){
        return this.vehicles.reduce((maxId, vehicle) => vehicle.id! > maxId ? vehicle.id! : maxId, 0);
    }
}