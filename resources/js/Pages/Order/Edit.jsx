import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, router} from '@inertiajs/react';

// get auth, order, vehicles, and customers from controller
function Edit({ auth, order, vehicles, customers }) {
    const [customerId, setCustomerId] = useState(order.customer.id)
    // initialize ordered vehicles
    const [selectedVehicles, setSelectedVehicles] = useState(() => {
        let orderedVehicles = []

        for (const orderDetail of order.order_details) {
            orderedVehicles.push({
                vehicle: orderDetail.vehicle,
                index: vehicles.findIndex(vehicle => vehicle.id == orderDetail.vehicle.id),
                amount: orderDetail.amount,
            })
        }

        return orderedVehicles
    })

    // add more vehicles to the array
    function handleAddVehicle() {
        setSelectedVehicles([
            ...selectedVehicles,
            {
                vehicle: vehicles[0],
                index: 0,
                amount: 1,
            }
        ])
    }

    // remove vehicles from array
    function handleRemoveVehicle(index) {
        // make a separate copy of the array
        let selectedVehiclesCopy = [...selectedVehicles]
        // remove item by index
        selectedVehiclesCopy.splice(index, 1)
        // set copy array to original array
        setSelectedVehicles(selectedVehiclesCopy)
    }

    // handle on vehicle type change
    function handleModifyVehicleType(e, index) {
        // make a separate copy of the array
        let selectedVehiclesCopy = [...selectedVehicles]
        // make a separate copy of the item
        let selectedVehicleCopy = {...selectedVehiclesCopy[index]}
        // set new value
        selectedVehicleCopy.vehicle = vehicles[e.target.value]
        selectedVehicleCopy.index = e.target.value
        // put back into the copied array
        selectedVehiclesCopy[index] = selectedVehicleCopy;
        // set original array
        setSelectedVehicles(selectedVehiclesCopy);
    }

    // handle on vehicle amount change
    function handleModifyVehicleAmount(e, index) {
        // make a separate copy of the array
        let selectedVehiclesCopy = [...selectedVehicles]
        // make a separate copy of the item
        let selectedVehicleCopy = {...selectedVehiclesCopy[index]}
        // set new value
        selectedVehicleCopy.amount = e.target.value
        // put back into the copied array
        selectedVehiclesCopy[index] = selectedVehicleCopy;
        // set original array
        setSelectedVehicles(selectedVehiclesCopy);
    }

    // handle on form submit, send data to controller
    function handleSubmit(e) {
        e.preventDefault()
        router.post(route('orders.update', order.id), {
            _method: 'put',
            customer_id: customerId,
            vehicles: selectedVehicles
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ubah Order</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Pilih Customer *</label>
                                <select name="type" required
                                        value={customerId}
                                        onChange={(e) => setCustomerId(e.target.value)}
                                        className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400'>
                                    {customers.map((customer) => (
                                        <option value={customer.id}>{customer.name} - {customer.address} - {customer.phone}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-x-6 md:grid-cols-2">
                                {selectedVehicles.map((selectedVehicle, index) => (
                                    <React.Fragment key={index}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Pilih Kendaraan *</label>
                                            <select name="type" required value={selectedVehicle.index}
                                                    onChange={(e) => handleModifyVehicleType(e, index)}
                                                    className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400'>
                                                {vehicles.map((vehicle, index2) => (
                                                    <option value={index2}>{vehicle.model} - {vehicle.manufacturer} -
                                                        {vehicle.vehicleable_type == 'App\\Models\\Car' ? (
                                                            ' Mobil'
                                                        ) : (
                                                            vehicle.vehicleable_type == 'App\\Models\\Car' ? (
                                                                ' Motor'
                                                            ) : (
                                                                ' Truk'
                                                            )
                                                        )}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Kendaraan *</label>
                                            <div className='flex gap-4'>
                                                <input type="number" name="amount" min="1"
                                                       value={selectedVehicle.amount}
                                                       onChange={(e) => handleModifyVehicleAmount(e, index)}
                                                       className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                                       placeholder="1" required />
                                                {/* if more than 1 item in array then show delete button */}
                                                {selectedVehicles.length > 1 ? (
                                                    <button type="button" className="inline-block cursor-pointer float-right rounded transition border border-red-500 bg-red-500 p-3 text-white hover:bg-transparent hover:text-red-500 focus:outline-none focus:ring active:text-red-500"
                                                            onClick={() => handleRemoveVehicle(index)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    ''
                                                )}
                                            </div>

                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                            <button type="button" onClick={handleAddVehicle}
                                    className="text-indigo-500 w-full transition border border-indigo-500 mb-6 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Tambah Kendaraan
                            </button>
                            <button type="submit"
                                    className="text-white w-full transition bg-indigo-500 hover:bg-indigo-400 focus:ring-4 focus:outline-none focus:ring-pink font-bold rounded-lg text-sm px-5 py-3 text-center">Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Edit;
