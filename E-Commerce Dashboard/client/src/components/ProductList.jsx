import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
        console.log(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE',
        })
        result = await result.json()
        if (result) {
            alert('Product deleted successfully');
        }
    };

    const searchHandler = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        }else{
            getProducts();
        }

    }

    return (
        <div className="container mx-auto p-8">
            <h3 className="text-2xl font-semibold text-center mb-6">Product List</h3>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, category, or company"
                    className="border rounded p-2 w-full"
                    onChange={searchHandler}
                />
            </div>
            {products.length ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border border-gray-300">Sl.No.</th>
                                <th className="px-4 py-2 border border-gray-300">Name</th>
                                <th className="px-4 py-2 border border-gray-300">Price</th>
                                <th className="px-4 py-2 border border-gray-300">Category</th>
                                <th className="px-4 py-2 border border-gray-300">Company</th>
                                <th className="px-4 py-2 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border border-gray-300">{product.name}</td>
                                    <td className="px-4 py-2 border border-gray-300">{product.price}</td>
                                    <td className="px-4 py-2 border border-gray-300">{product.category}</td>
                                    <td className="px-4 py-2 border border-gray-300">{product.company}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button className='bg-red-400 rounded p-1' onClick={() => deleteProduct(product._id)}>DELETE</button>
                                        <Link to={`/update/${product._id}`} className='ml-4 text-blue-500 underline'>Update</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-8">No products available</p>
            )}
        </div>
    );
};

export default ProductList;
