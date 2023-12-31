import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, router} from '@inertiajs/react';

// get auth and orders from controller
function Index({ auth, orders }) {
    // calculate total of each order
    for (let order of orders) {
        let total = 0.00
        for (const orderDetail of order.order_details) {
            total += orderDetail.vehicle.price * orderDetail.amount
        }
        order['total'] = total
    }

    // handle on delete button pressed, delete specified order
    function handleDelete(e, id) {
        e.preventDefault()
        router.delete(route('orders.delete', id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Order</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <a className="inline-block float-right mb-2 rounded transition border border-indigo-500 bg-indigo-500 p-3 text-white hover:bg-transparent hover:text-indigo-500 focus:outline-none focus:ring active:text-indigo-500"
                           href={route('orders.create')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                        </a>
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm table-auto">
                            <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                                    Customer
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                                    Kendaraan Dipesan
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                                    Total
                                </th>
                            </tr>
                            </thead>

                            <tbody className='divide-y divide-gray-200'>
                            {/* render each order as table row */}
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center">
                                        <p><b>Nama: </b>{order.customer.name}</p>
                                        <p><b>Alamat: </b>{order.customer.address}</p>
                                        <p><b>Nomor Telepon: </b>{order.customer.phone}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center">
                                        {order.order_details.map((orderDetail, index) => (
                                            <div className='py-2 flex items-center justify-center gap-10' key={orderDetail.id}>
                                                <div>
                                                    <span className='text-xl'>{index + 1}.</span>
                                                </div>
                                                <div>
                                                    <p><b>Model (Tahun & Manufaktur): </b>{orderDetail.vehicle.model} - {orderDetail.vehicle.year} - {orderDetail.vehicle.manufacturer}</p>
                                                    <p><b>Tipe Kendaraan: </b>{
                                                        orderDetail.vehicle.vehicleable_type == 'App\\Models\\Car' ? (
                                                            'Mobil'
                                                        ) : (
                                                            orderDetail.vehicle.vehicleable_type == 'App\\Models\\Motorcycle' ? (
                                                                'Motor'
                                                            ) : (
                                                                'Truk'
                                                            )
                                                        )
                                                    }</p>
                                                    <p><b>Harga: </b>Rp {orderDetail.vehicle.model}</p>
                                                    {
                                                        orderDetail.vehicle.vehicleable_type == 'App\\Models\\Car' ? (
                                                            <>
                                                                <p><b>Jenis Bahan Bakar: </b>{orderDetail.vehicle.vehicleable.fuel_type == 'gasoline' ? 'Bensin' : 'Diesel'}</p>
                                                                <p><b>Luas Bagasi: </b>{orderDetail.vehicle.vehicleable.trunk_space} L</p>
                                                            </>
                                                        ) : (
                                                            orderDetail.vehicle.vehicleable_type == 'App\\Models\\Motorcycle' ? (
                                                                <>
                                                                    <p><b>Luas Bagasi: </b>{orderDetail.vehicle.vehicleable.trunk_space} L</p>
                                                                    <p><b>Kapasitas Bensin: </b>{orderDetail.vehicle.vehicleable.fuel_capacity} L</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p><b>Jumlah Roda: </b>{orderDetail.vehicle.vehicleable.wheels}</p>
                                                                    <p><b>Luas Area Cargo: </b>{orderDetail.vehicle.vehicleable.cargo_space} L</p>
                                                                </>
                                                            )
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <p className='font-bold'>Jumlah</p>
                                                    <p className='text-bold'>{orderDetail.amount}</p>
                                                </div>
                                                <div>
                                                    <p className='font-bold'>Subtotal</p>
                                                    <p className='text-bold'>Rp {orderDetail.amount * orderDetail.vehicle.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center">
                                        <p>Rp {order.total}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                        <span className="inline-block cursor-pointer float-right mb-2 ml-2 rounded transition border border-red-500 bg-red-500 p-3 text-white hover:bg-transparent hover:text-red-500 focus:outline-none focus:ring active:text-red-500"
                                              onClick={(e) => handleDelete(e, order.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                            </svg>
                                        </span>
                                        <a className="inline-block float-right mb-2 rounded transition border border-yellow-500 bg-yellow-500 p-3 text-white hover:bg-transparent hover:text-yellow-500 focus:outline-none focus:ring active:text-yellow-500"
                                           href={route('orders.edit', order.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
