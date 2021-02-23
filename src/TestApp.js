import React from 'react'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import TestProfile from './views/TestProfile'
const TestApp = () => {
    return (
        <div>
            <h1>Hi ther</h1>
            <LoginButton/>
            <LogoutButton/>
            <TestProfile/>
        </div>
    )
}

export default TestApp
