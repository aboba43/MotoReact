'use client'

import "./globals.css";
import Header from "@/app/Header/Header";
import Sidebar from "@/app/Sidebar/Sidebar";
import Main from "@/app/Main/Main";
import { useState } from "react";

export default function Home() {
    const [activeFilters, setActiveFilters] = useState({
        type: [],
        year: [],
        make: []
    });

    const handleFilterChange = (filterType, value, isChecked) => {
        setActiveFilters(prev => ({
            ...prev,
            [filterType]: isChecked 
                ? [...prev[filterType], value]
                : prev[filterType].filter(item => item !== value)
        }));
    };

    return (
        <>
            <Header />
            <div className="main">
                <Sidebar onFilterChange={handleFilterChange} activeFilters={activeFilters} />
                <Main filters={activeFilters} />
            </div>
        </>
    );
}


