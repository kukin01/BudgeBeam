    import * as React from 'react'
    import { Outlet } from 'react-router-dom'

    const AuthLayout: React.FC = () => {
    return (
        <div
        style={{
            backgroundImage: 'url(/images/auth-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition:'left',
            height: '100vh',
        }}>
            <div className='flex items-center justify-center h-screen'>
            <div className='bg-white p-8 rounded shadow-md '>
                <Outlet />
            </div>
            </div>
        </div>
    )
    }

    export default AuthLayout
