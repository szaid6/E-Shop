import React, { useEffect, useState } from 'react';
import './Product.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'api/axios';
import ProductCard from 'components/productcard/ProductCard';
import Select from 'react-select';

const Product = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedSort, setSelectedSort] = useState('default');

    // Fetch categories from the API
    const getCategories = async () => {
        try {
            const response = await axios.get("/products/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Fetch products from the API
    const getProducts = async () => {
        try {
            const response = await axios.get("/products");
            const productData = response.data;
            setProducts(productData);
            setFilteredData(productData); // Initialize filtered data
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    // Handle category change
    const handleCategoryChange = (event, category) => {
        if (!category) return;

        setSelectedCategory(category);
        // Filter data based on selected category
        const filtered = category === 'all'
            ? products
            : products.filter((product) => product.category === category);


        // Apply current sorting option to the filtered data
        const sortedData = [...filtered].sort((a, b) => {
            switch (selectedSort) {
                case 'highToLow':
                    return b.price - a.price;
                case 'lowToHigh':
                    return a.price - b.price;
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        });

        setFilteredData(sortedData);
    };

    // Handle sorting
    const handleSorting = (e) => {
        setSelectedSort(e.value);
        const sortedData = [...filteredData].sort((a, b) => {
            switch (e.value) {
                case 'highToLow':
                    return b.price - a.price;
                case 'lowToHigh':
                    return a.price - b.price;
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        });
        setFilteredData(sortedData);
    };

    const options = [
        { value: 'default', label: 'Default' },
        { value: 'highToLow', label: 'Price: High to Low' },
        { value: 'lowToHigh', label: 'Price: Low to High' },
        { value: 'newest', label: 'Newest' },
    ];

    return (
        <div className="w-full flex flex-column gap-3">
            <ToggleButtonGroup
                color="primary"
                value={selectedCategory}
                exclusive
                onChange={handleCategoryChange}
                aria-label="Platform"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
            >
                <ToggleButton value="all">All</ToggleButton>
                {categories.map((category, index) => (
                    <ToggleButton value={category} key={index}>{category}</ToggleButton>
                ))}
            </ToggleButtonGroup>

            <div style={{ width: '200px', marginLeft: '5rem', marginTop: '2rem' }}>
                <label>Sort by:</label>
                <Select
                    options={options}
                    placeholder="Select..."
                    onChange={handleSorting}
                    value={options.find((option) => option.value === selectedSort)}
                />
            </div>

            <div className="productContainer">
                {filteredData.map((product, index) => (
                    <ProductCard data={product} key={index} />
                ))}
            </div>

        </div>
    );
};

export default Product;
