import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, router} from '@inertiajs/react';

// get auth and vehicles from controller
function Edit({ auth, vehicle }) {
    // turn vehicleable_type to vehicle type string
    const initialVehicleType = () => {
        if (vehicle.vehicleable_type == 'App\\Models\\Car') {
            return 'car'
        } else if (vehicle.vehicleable_type == 'App\\Models\\Motorcycle') {
            return 'motorcycle'
        } else {
            return 'truck'
        }
    }
    const [model, setModel] = useState(vehicle.model)
    const [year, setYear] = useState(vehicle.year)
    const [capacity, setCapacity] = useState(vehicle.capacity)
    const [manufacturer, setManufacturer] = useState(vehicle.manufacturer)
    const [price, setPrice] = useState(vehicle.price)
    const [type, setType] = useState(initialVehicleType)
    const [fuelType, setFuelType] = useState(() => {
        if (vehicle.vehicleable.fuel_type == 'gasoline') {
            return 'gasoline'
        } else if (vehicle.vehicleable.fuel_type == 'diesel') {
            return 'diesel'
        } else {
            // if not car then set to gasoline as default select value
            return 'gasoline'
        }
    })
    // if variable is not set then set empty string as default input value
    const [trunkSpace, setTrunkSpace] = useState(
        vehicle.vehicleable.trunk_space ? vehicle.vehicleable.trunk_space : ''
    )
    const [fuelCapacity, setFuelCapacity] = useState(
        vehicle.vehicleable.fuel_capacity ? vehicle.vehicleable.fuel_capacity : ''
    )
    const [wheels, setWheels] = useState(
        vehicle.vehicleable.wheels ? vehicle.vehicleable.wheels : ''
    )
    const [cargoSpace, setCargoSpace] = useState(
        vehicle.vehicleable.cargo_space ? vehicle.vehicleable.cargo_space : ''
    )

    // handle on form submit, send data to controller
    function handleSubmit(e) {
        e.preventDefault()
        if (type == 'car') {
            router.post(route('vehicles.update', vehicle.id), {
                _method: 'put',
                model: model,
                year: year,
                capacity: capacity,
                manufacturer: manufacturer,
                price: price,
                type: type,
                fuel_type: fuelType,
                trunk_space: trunkSpace,
            })
        } else if (type == 'motorcycle') {
            router.post(route('vehicles.update', vehicle.id), {
                _method: 'put',
                model: model,
                year: year,
                capacity: capacity,
                manufacturer: manufacturer,
                price: price,
                type: type,
                trunk_space: trunkSpace,
                fuel_capacity: fuelCapacity,
            })
        } else {
            router.post(route('vehicles.update', vehicle.id), {
                _method: 'put',
                model: model,
                year: year,
                capacity: capacity,
                manufacturer: manufacturer,
                price: price,
                type: type,
                wheels: wheels,
                cargo_space: cargoSpace,
            })
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Vehicle Baru</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                       <form onSubmit={handleSubmit}>
                           <div className="mb-6">
                               <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900">Model Kendaraan *</label>
                               <input type="text" name="model"
                                      value={model}
                                      onChange={(e) => setModel(e.target.value)}
                                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                      placeholder="Civic" required />
                           </div>
                           <div className="mb-6">
                               <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900">Tahun Keluaran *</label>
                               <input type="number" name="year"
                                      value={year}
                                      onChange={(e) => setYear(e.target.value)}
                                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                      placeholder="2023" required />
                           </div>
                           <div className="mb-6">
                               <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900">Kapasistas Penumpang *</label>
                               <input type="number" name="capacity"
                                      value={capacity}
                                      onChange={(e) => setCapacity(e.target.value)}
                                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                      placeholder="5" required />
                           </div>
                           <div className="mb-6">
                               <label htmlFor="manufacturer" className="block mb-2 text-sm font-medium text-gray-900">Manufaktur *</label>
                               <input type="text" name="manufacturer"
                                      value={manufacturer}
                                      onChange={(e) => setManufacturer(e.target.value)}
                                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                      placeholder="Honda" required />
                           </div>
                           <div className="mb-6">
                               <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Harga (Rp) *</label>
                               <input type="number" name="price"
                                      value={price}
                                      onChange={(e) => setPrice(e.target.value)}
                                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                      placeholder="400000000" required />
                           </div>
                           <div className="mb-6">
                               <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900">Tipe Kendaraan *</label>
                               <select name="type" required
                                   onChange={(e) => {
                                       // reset trunk space value if car/motorcycle is selected again
                                       if (e.target.value == initialVehicleType()) {
                                           if (e.target.value == 'car' || e.target.value == 'motorcycle') {
                                               setTrunkSpace(vehicle.vehicleable.trunk_space)
                                           }
                                       } else {
                                           setTrunkSpace('')
                                       }
                                       setType(e.target.value)
                                   }}
                                   value={type}
                                   className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400'>
                                   <option value="car">Mobil</option>
                                   <option value="motorcycle">Motor</option>
                                   <option value="truck">Truk</option>
                               </select>
                           </div>
                           {/* conditional rendering for each vehicle type */}
                           {type == 'car' ? (
                               <>
                                   <div className="mb-6">
                                       <label htmlFor="fuel_type" className="block mb-2 text-sm font-medium text-gray-900">Jenis Bahan Bakar *</label>
                                       <select name="fuel_type" required
                                               onChange={(e) => setFuelType(e.target.value)} value={fuelType}
                                               className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400'>
                                           <option value="gasoline">Bensin</option>
                                           <option value="diesel">Diesel</option>
                                       </select>
                                   </div>
                                   <div className="mb-6">
                                       <label htmlFor="trunk_space" className="block mb-2 text-sm font-medium text-gray-900">Luas Bagasi (L) *</label>
                                       <input type="number" name="trunk_space"
                                              value={trunkSpace}
                                              onChange={(e) => setTrunkSpace(e.target.value)}
                                              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                              placeholder="100" required />
                                   </div>
                               </>
                           ) : (
                               type == 'motorcycle' ? (
                                   <>
                                       <div className="mb-6">
                                           <label htmlFor="trunk_space" className="block mb-2 text-sm font-medium text-gray-900">Ukuran Bagasi (L) *</label>
                                           <input type="number" name="trunk_space"
                                                  value={trunkSpace}
                                                  onChange={(e) => setTrunkSpace(e.target.value)}
                                                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                                  placeholder="15" required />
                                       </div>
                                       <div className="mb-6">
                                           <label htmlFor="fuel_capacity" className="block mb-2 text-sm font-medium text-gray-900">Kapasitas Bensin (L) *</label>
                                           <input type="number" name="fuel_capacity"
                                                  value={fuelCapacity}
                                                  onChange={(e) => setFuelCapacity(e.target.value)}
                                                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                                  placeholder="20" required />
                                       </div>
                                   </>
                               ) : (
                                   <>
                                       <div className="mb-6">
                                           <label htmlFor="fuel_capacity" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Roda *</label>
                                           <input type="number" name="fuel_capacity"
                                                  value={wheels}
                                                  onChange={(e) => setWheels(e.target.value)}
                                                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                                  placeholder="6" required />
                                       </div>
                                       <div className="mb-6">
                                           <label htmlFor="cargo_space" className="block mb-2 text-sm font-medium text-gray-900">Luas Area Kargo (L) *</label>
                                           <input type="number" name="cargo_space"
                                                  value={cargoSpace}
                                                  onChange={(e) => setCargoSpace(e.target.value)}
                                                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                                  placeholder="1000" required />
                                       </div>
                                   </>
                               )
                           )}
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