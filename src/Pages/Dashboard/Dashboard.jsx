import React from 'react';
import Navbar from '../../Components/Navbar';
import SearchComp from "../../Components/SearchComp";
//this is the main page of the application that renders only imported child components.
const Dashboard = () => {

    return (
        <>
            <Navbar />
            <SearchComp />
        </>
    )
}

export default Dashboard;