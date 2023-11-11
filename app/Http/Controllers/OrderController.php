<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Customer;
use App\Models\Motorcycle;
use App\Models\OrderDetail;
use App\Models\Truck;
use App\Models\Order;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    // get all orders and render page at "/orders" route
    public function index() {
        // get all orders from the database with its details and customer
        $orders = Order::query()->with('orderDetails.vehicle.vehicleable', 'customer')->get();

        // return orders to index page and render index page
        return Inertia::render('Order/Index', compact('orders'));
    }

    // render create page at "/orders/create" route
    public function create() {
        // get vehicles and customers data
        $vehicles = Vehicle::all();
        $customers = Customer::all();

        // render create page with customers and vehicles data
        return Inertia::render('Order/Create', compact('vehicles', 'customers'));
    }

    // receive post request from create route
    public function store(Request $request) {
        // check if request has customer data
        if ($request->has('name')) {
            // save ID card image
            $imageName = time().'.'.$request->file('idCard')->extension();
            $request->file('idCard')->move(public_path('img/id_card'), $imageName);

           $customer =  Customer::query()->create([
                'name' => $request->input('name'),
                'address' => $request->input('address'),
                'phone' => $request->input('phone'),
                'id_card_path' => $imageName,
            ]);

           $order = Order::query()->create([
               'customer_id' => $customer->id
           ]);

           foreach ($request->input('vehicles') as $vehicle) {
               OrderDetail::query()->create([
                   'order_id' => $order->id,
                   'vehicle_id' => $vehicle['vehicle']['id'],
                   'amount' => $vehicle['amount']
               ]);
           }
        } else {
            $order = Order::query()->create([
                'customer_id' => $request->input('customer_id')
            ]);

            foreach ($request->input('vehicles') as $vehicle) {
                OrderDetail::query()->create([
                    'order_id' => $order->id,
                    'vehicle_id' => $vehicle['vehicle']['id'],
                    'amount' => $vehicle['amount']
                ]);
            }
        }

        // return to orders index route
        return to_route('orders.index');
    }

    // get the specified order from "id" URL parameter and render page at "orders/edit" route
    public function edit($id) {
        // get vehicles and customers data
        $vehicles = Vehicle::all();
        $customers = Customer::all();

        // get specified order, its details, and customer from the database
        $order = Order::query()->with('orderDetails.vehicle.vehicleable', 'customer')->find($id);

        // return order, vehicles, and customers to edit page and render edit page
        return Inertia::render('Order/Edit', compact('order', 'vehicles', 'customers'));
    }

    // receive update request from edit route
    public function update(Request $request, $id) {
        // get specified order
        $order = Order::query()->find($id);

        // delete and create new order details
        $order->orderDetails()->delete();
        foreach ($request->input('vehicles') as $vehicle) {
            OrderDetail::query()->create([
                'order_id' => $order->id,
                'vehicle_id' => $vehicle['vehicle']['id'],
                'amount' => $vehicle['amount']
            ]);
        }

        // update customer
        $order->update([
           'customer_id' => $request->input('customer_id')
        ]);

        // return to orders index route
        return to_route('orders.index');
    }

    // delete specified order and its subrecord (car, motorcycler, or truck record)
    public function delete($id) {
        // get specified order from database
        $order = Order::query()->find($id);

        // delete order details
        $order->orderDetails()->delete();
        // delete order record
        $order->delete();

        // return to orders index route
        return to_route('orders.index');
    }
}
