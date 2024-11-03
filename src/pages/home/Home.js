import Navbar from 'components/navbar/Navbar'
import ProductCard from 'components/productcard/ProductCard'
import useAuth from 'hooks/useAuth'
import React from 'react'

function Home() {
    const { auth } = useAuth()

    return (
        <>
            <div>{auth.email}</div>
            <ProductCard />
        </>
    )
}

export default Home