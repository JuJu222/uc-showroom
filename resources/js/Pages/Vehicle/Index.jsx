import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, router} from '@inertiajs/react';

// get auth and vehicles from controller
function Index({ auth, vehicles }) {

    // handle on delete button pressed, delete specified vehicle
    function handleDelete(e, id) {
        e.preventDefault()
        router.delete(route('vehicles.delete', id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Kendaraan</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <a className="inline-block float-right mb-2 rounded transition border border-indigo-500 bg-indigo-500 p-3 text-white hover:bg-transparent hover:text-indigo-500 focus:outline-none focus:ring active:text-indigo-500"
                           href={route('vehicles.create')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                        </a>
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm table-auto">
                            <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                                    Model Kendaraan
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                                    Tahun Keluaran
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                                    Kapasitas Penumpang
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                                    Manufaktur
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                                    Harga
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                                    Tipe Kendaraan
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {/* render each vehicle as table row */}
                            {vehicles.map((vehicle) => (
                                <React.Fragment key={vehicle.id}>
                                    <tr className='border-t'>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center">
                                            {vehicle.model}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center">
                                            {vehicle.year}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center">
                                            {vehicle.capacity}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center">
                                            {vehicle.manufacturer}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center">
                                            Rp {vehicle.price}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center">
                                            {/* conditional rendering for vehicle type */}
                                            {vehicle.vehicleable_type == 'App\\Models\\Car' ? (
                                                'Mobil'
                                            ) : (
                                                vehicle.vehicleable_type == 'App\\Models\\Motorcycle' ? (
                                                    'Motor'
                                                ) : (
                                                    'Truk'
                                                )
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                        <span className="inline-block cursor-pointer float-right mb-2 ml-2 rounded transition border border-red-500 bg-red-500 p-3 text-white hover:bg-transparent hover:text-red-500 focus:outline-none focus:ring active:text-red-500"
                                              onClick={(e) => handleDelete(e, vehicle.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                            </svg>
                                        </span>
                                            <a className="inline-block float-right mb-2 rounded transition border border-yellow-500 bg-yellow-500 p-3 text-white hover:bg-transparent hover:text-yellow-500 focus:outline-none focus:ring active:text-yellow-500"
                                               href={route('vehicles.edit', vehicle.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                    {/* conditional rendering for subtype row */}
                                    {vehicle.vehicleable_type == 'App\\Models\\Car' ? (
                                        <>
                                            <tr>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-900 font-bold text-center">
                                                    Jenis Bahan Bakar
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-900 font-bold text-center">
                                                    Luas Bagasi (L)
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="whitespace-nowrap px-4 py-2 pb-5 text-gray-900">
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 pb-5 text-gray-900 text-center">
                                                    {vehicle.vehicleable.fuel_type == 'gasoline' ? 'Bensin' : 'Diesel'}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 pb-5 text-gray-900 text-center">
                                                    {vehicle.vehicleable.trunk_space} L
                                                </td>
                                            </tr>
                                        </>
                                    ) : (
                                        vehicle.vehicleable_type == 'App\\Models\\Motorcycle' ? (
                                            <>
                                                <tr>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-900 font-bold text-center">
                                                        Ukuran Bagasi (L)
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-900 font-bold text-center">
                                                        Kapasitas Bensin (L)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap px-4 py-2 pb-5 text-gray-900">
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 pb-5 text-gray-900 text-center">
                                                        {vehicle.vehicleable.trunk_space} L
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 pb-5 text-gray-900 text-center">
                                                        {vehicle.vehicleable.fuel_capacity} L
                                                    </td>
                                                </tr>
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-900 font-bold text-center">
                                                        Jumlah Roda
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-900 font-bold text-center">
                                                        Luas Area Kargo (L)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap px-4 py-2 pb-5 text-gray-900">
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 pb-5 text-gray-900 text-center">
                                                        {vehicle.vehicleable.wheels}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 pb-5 text-gray-900 text-center">
                                                        {vehicle.vehicleable.cargo_space} L
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    )}
                                </React.Fragment>
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
