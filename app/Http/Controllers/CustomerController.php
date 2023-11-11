<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class CustomerController extends Controller
{
    // get all customers and render page at "customers/" route
    public function index() {
        // get all customers from the database
        $customers = Customer::all();

        // return customers to index page and render index page
        return Inertia::render('Customer/Index', compact('customers'));
    }

    // render create page at "customers/create" route
    public function create() {
        // render create page
        return Inertia::render('Customer/Create');
    }

    // receive post request from create route
    public function store(Request $request) {
        $imageName = time().'.'.$request->file('idCard')->extension();
        $request->file('idCard')->move(public_path('img/id_card'), $imageName);

        Customer::query()->create([
            'name' => $request->input('name'),
            'address' => $request->input('address'),
            'phone' => $request->input('phone'),
            'id_card_path' => $imageName,
        ]);

        // return to customers index route
        return to_route('customers.index');
    }

    // get the specified customer from "id" URL parameter and render page at "customers/edit" route
    public function edit($id) {
        // get specified customers from the database
        $customer = Customer::query()->find($id);

        // return customer to edit page and render edit page
        return Inertia::render('Customer/Edit', compact('customer'));
    }

    // receive update request from edit route
    public function update(Request $request, $id) {
        // get the old specified customer data
        $customer = Customer::query()->find($id);

        // check if request contains ID card image, if yes delete old file then update it
        if ($request->file('idCard')) {
            File::delete('img/id_card/'.$customer->id_card_path);

            $imageName = time().'.'.$request->file('idCard')->extension();
            $request->file('idCard')->move(public_path('img/id_card'), $imageName);

            $customer->update([
                'name' => $request->input('name'),
                'address' => $request->input('address'),
                'phone' => $request->input('phone'),
                'id_card_path' => $imageName,
            ]);
        } else {
            $customer->update([
                'name' => $request->input('name'),
                'address' => $request->input('address'),
                'phone' => $request->input('phone'),
            ]);
        }

        // return to customers index route
        return to_route('customers.index');
    }

    // delete specified customer and ID card image
    public function delete($id) {
        $customer = Customer::query()->find($id);

        File::delete('img/id_card/'.$customer->id_card_path);
        $customer->delete();

        // return to customers index route
        return to_route('customers.index');
    }
}
