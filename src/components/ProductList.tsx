import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductWithVendor, ProductResponse } from "../models/product";

function ProductList() {
  const [products, setProducts] = useState<ProductWithVendor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchProducts(searchTerm);
  }, [searchTerm]);

  const fetchProducts = async (search: string = "") => {
    try {
      const response = await axios.get<ProductResponse>(
        `http://localhost:8080/api/v1/products${search ? `?name=${search}` : ""}`
      );

      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">All Products</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {product.product_name}
              </h3>
              <p className="text-gray-600 mb-4">${product.price}</p>
              <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
              <p className="text-gray-600 mb-4">Vendor: {product.vendor_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
