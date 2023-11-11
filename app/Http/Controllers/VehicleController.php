<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Motorcycle;
use App\Models\Truck;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    // get all vehicles and render page at "/vehicles" route
    public function index() {
        // get all vehicles from the database with its child table
        $vehicles = Vehicle::query()->with('vehicleable')->get();

        // return vehicles to index page and render index page
        return Inertia::render('Vehicle/Index', compact('vehicles'));
    }

    // render create page at "/vehicles/create" route
    public function create() {
        // render create page
        return Inertia::render('Vehicle/Create');
    }

    // receive post request from create route
    public function store(Request $request) {
        // check for vehicle type
        if ($request->input('type') == 'car') {
            $car = Car::query()->create([
                'fuel_type' => $request->input('fuel_type'),
                'trunk_space' => $request->input('trunk_space'),
            ]);

            $car->vehicle()->create([
                'model' => $request->input('model'),
                'year' => $request->input('year'),
                'capacity' => $request->input('capacity'),
                'manufacturer' => $request->input('manufacturer'),
                'price' => $request->input('price')
            ]);

        } else if ($request->input('type') == 'motorcycle') {
            $motorcycle = Motorcycle::query()->create([
                'trunk_space' => $request->input('trunk_space'),
                'fuel_capacity' => $request->input('fuel_capacity'),
            ]);

            $motorcycle->vehicle()->create([
                'model' => $request->input('model'),
                'year' => $request->input('year'),
                'capacity' => $request->input('capacity'),
                'manufacturer' => $request->input('manufacturer'),
                'price' => $request->input('price')
            ]);
        } else {
            $truck = Truck::query()->create([
                'wheels' => $request->input('wheels'),
                'cargo_space' => $request->input('cargo_space'),
            ]);

            $truck->vehicle()->create([
                'model' => $request->input('model'),
                'year' => $request->input('year'),
                'capacity' => $request->input('capacity'),
                'manufacturer' => $request->input('manufacturer'),
                'price' => $request->input('price')
            ]);
        }

        // return to vehicles index route
        return to_route('vehicles.index');
    }

    // get the specified vehicle from "id" URL parameter and render page at "vehicles/edit" route
    public function edit($id) {
        // get specified vehicle and its subrecord from the database
        $vehicle = Vehicle::query()->with('vehicleable')->find($id);

        // return vehicle to edit page and render edit page
        return Inertia::render('Vehicle/Edit', compact('vehicle'));
    }

    // receive update request from edit route
    public function update(Request $request, $id) {
        // get the old specified vehicle data with its subrecord
        $vehicle = Vehicle::query()->with('vehicleable')->find($id);

        // convert old vehicle subclass model to string type
        if ($vehicle->vehicleable_type == 'App\\Models\\Car') {
            $oldType = 'car';
        } else if ($vehicle->vehicleable_type == 'App\\Models\\Motorcycle') {
            $oldType = 'motorcycle';
        } else {
            $oldType = 'truck';
        }

        // if old type is different with new type then delete old type and create new one then update its link
        if ($oldType != $request->input('type')) {
            $vehicle->vehicleable()->delete();

            if ($request->input('type') == 'car') {
                $car = Car::query()->create([
                    'fuel_type' => $request->input('fuel_type'),
                    'trunk_space' => $request->input('trunk_space'),
                ]);

                $vehicle->update([
                    'model' => $request->input('model'),
                    'year' => $request->input('year'),
                    'capacity' => $request->input('capacity'),
                    'manufacturer' => $request->input('manufacturer'),
                    'price' => $request->input('price'),
                    'vehicleable_type' => 'App\\Models\\Car',
                    'vehicleable_id' => $car->id,
                ]);
            } else if ($request->input('type') == 'motorcycle') {
                $motorcycle = Motorcycle::query()->create([
                    'trunk_space' => $request->input('trunk_space'),
                    'fuel_capacity' => $request->input('fuel_capacity'),
                ]);

                $vehicle->update([
                    'model' => $request->input('model'),
                    'year' => $request->input('year'),
                    'capacity' => $request->input('capacity'),
                    'manufacturer' => $request->input('manufacturer'),
                    'price' => $request->input('price'),
                    'vehicleable_type' => 'App\\Models\\Motorcycle',
                    'vehicleable_id' => $motorcycle->id,
                ]);
            } else {
                $truck = Truck::query()->create([
                    'wheels' => $request->input('wheels'),
                    'cargo_space' => $request->input('cargo_space'),
                ]);
                $vehicle->update([
                    'model' => $request->input('model'),
                    'year' => $request->input('year'),
                    'capacity' => $request->input('capacity'),
                    'manufacturer' => $request->input('manufacturer'),
                    'price' => $request->input('price'),
                    'vehicleable_type' => 'App\\Models\\Truck',
                    'vehicleable_id' => $truck->id,
                ]);
            }
        } else {
            // if type is the same then just update the sub record and the vehicle record
            $vehicle->update([
                'model' => $request->input('model'),
                'year' => $request->input('year'),
                'capacity' => $request->input('capacity'),
                'manufacturer' => $request->input('manufacturer'),
                'price' => $request->input('price'),
            ]);

            if ($request->input('type') == 'car') {
                $vehicle->vehicleable()->update([
                    'fuel_type' => $request->input('fuel_type'),
                    'trunk_space' => $request->input('trunk_space'),
                ]);
            } else if ($request->input('type') == 'motorcycle') {
                $vehicle->vehicleable()->update([
                    'trunk_space' => $request->input('trunk_space'),
                    'fuel_capacity' => $request->input('fuel_capacity'),
                ]);
            } else {
                $vehicle->vehicleable()->update([
                    'wheels' => $request->input('wheels'),
                    'cargo_space' => $request->input('cargo_space'),
                ]);
            }
        }

        // return to vehicles index route
        return to_route('vehicles.index');
    }

    // delete specified vehicle and its subrecord (car, motorcycler, or truck record)
    public function delete($id) {
        // get specified vehicle from database
        $vehicle = Vehicle::query()->find($id);

        // delete subrecord
        $vehicle->vehicleable->delete();
        // delete vehicle record
        $vehicle->delete();

        // return to vehicles index route
        return to_route('vehicles.index');
    }
}
