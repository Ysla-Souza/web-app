// src/layouts/MainLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import 'tailwindcss/tailwind.css'; // Importa o Tailwind CSS global
import Footer from '../components/Footer/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
