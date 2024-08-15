import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params= useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails= async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json()
        console.log(result)
        

        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: 'PUT',
            body: JSON.stringify({name,price,category,company}),
            headers: {'Content-Type': 'application/json'},
        })
        result= await result.json();
        alert('Product updated successfully')
        navigate('/')

    };

    return (
        <div className="container mx-auto p-8 max-w-lg">
            <h3 className="text-2xl font-semibold text-center mb-6">Update Product</h3>
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Enter Product name"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Product price"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Product category"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Product company"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <button
                    className="w-full bg-orange-500 text-white text-xl px-3 py-2 rounded hover:bg-orange-600 transition-colors"
                    onClick={updateProduct}
                >
                    Update Product
                </button>
            </div>
        </div>
    );
};

export default UpdateProduct;
