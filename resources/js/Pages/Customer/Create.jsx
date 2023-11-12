import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, router} from '@inertiajs/react';

// get auth from controller
function Create({ auth }) {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [idCard, setIdCard] = useState({})

    // handle on form submit, send data to controller
    function handleSubmit(e) {
        e.preventDefault()
        router.post(route('customers.store'), {
            name: name,
            address: address,
            phone: phone,
            idCard: idCard,
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Customer Baru</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                       <form onSubmit={handleSubmit}>
                           <div className="mb-6">
                               <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nama Customer *</label>
                               <input type="text" name="name"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                      placeholder="John Doe" required />
                           </div>
                           <div className="mb-6">
                               <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Alamat *</label>
                               <input type="text" name="address"
                                      value={address}
                                      onChange={(e) => setAddress(e.target.value)}
                                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                      placeholder="Jl. Basuki Rahmat 200" required />
                           </div>
                           <div className="mb-6">
                               <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon *</label>
                               <input type="text" name="phone"
                                      value={phone}
                                      onChange={(e) => setPhone(e.target.value.replace(/\D/,''))}
                                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                      placeholder="082138172391" required />
                           </div>
                           <div className="mb-6">
                               <label htmlFor="id_card" className="block mb-2 text-sm font-medium text-gray-900">Foto ID Card (PNG/JPEG) *</label>
                               <input type="file" name="id_card" accept="image/png, image/jpeg"
                                      onChange={(e) => setIdCard(e.target.files[0])}
                                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-400 block w-full p-2.5 placeholder-gray-400"
                                      placeholder="082138172391" required />
                           </div>
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

export default Create;
