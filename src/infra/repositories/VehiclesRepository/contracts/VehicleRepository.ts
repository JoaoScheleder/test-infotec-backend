import Vehicle from "src/domain/models/Vehicle";

export default interface VehicleRepository {
    findAll(): Promise<Vehicle[]>;
    findById(id: number): Promise<Vehicle | undefined>;
    create(vehicle: Vehicle): Promise<Vehicle>;
    delete(id: number): Promise<number>;
    update(id: number, vehicle: Vehicle): Promise<Vehicle>;
}