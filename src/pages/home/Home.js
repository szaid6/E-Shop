import useAuth from 'hooks/useAuth'
import React from 'react'

function Home() {
    const { auth } = useAuth()

    return (
        <>
            <h1>Welcome to the Home Page</h1>
        </>
    )
}

export default Home