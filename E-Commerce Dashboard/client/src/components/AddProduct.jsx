import React, { useState } from 'react';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'POST',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: { 'Content-Type': 'application/json' },
        });
        result = await result.json();
        console.log(result);
        setName('');
        setPrice('');
        setCategory('');
        setCompany('');
        setError(false);
        alert('Product added successfully')
    };

    return (
        <div className="container mx-auto p-8 max-w-lg">
            <h3 className="text-2xl font-semibold text-center mb-6">Add New Product</h3>
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Enter Product name"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {error && !name && <span className="text-red-500 ml-2 block mt-1">Enter a valid name</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Product price"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {error && !price && <span className="text-red-500 ml-2 block mt-1">Enter a valid price</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Product category"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    {error && !category && <span className="text-red-500 ml-2 block mt-1">Enter a valid category</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Product company"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    {error && !company && <span className="text-red-500 ml-2 block mt-1">Enter a valid company</span>}
                </div>
                <button
                    className="w-full bg-orange-500 text-white text-xl px-3 py-2 rounded hover:bg-orange-600 transition-colors"
                    onClick={addProduct}
                >
                    Add Product
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
