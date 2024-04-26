import React, { useState, useEffect } from 'react';
import axios from "axios";
import AppConfig from "../config";

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageURLs, setImageURLs] = useState([]);

    const fetchImageURLs = async () => {
        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/images`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching image URLs:", error);
            return [];
        }
    };

    const updateImageIndex = () => {
        setCurrentImageIndex(currentIndex => (currentIndex + 1) % imageURLs.length);
    };

    useEffect(() => {
        fetchImageURLs()
            .then((images) => {
                setImageURLs(images.images);
            })
            .catch(error => {
                console.error("Error fetching image URLs:", error);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(updateImageIndex, 15000); // Change image every 5 seconds (5000 milliseconds)

        return () => clearInterval(interval);
    }, [imageURLs]);

    return (
        <div className={'min-h-screen relative overflow-hidden'}
            style={{
                backgroundImage: imageURLs.length > 0 ? `url(${imageURLs[currentImageIndex]})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-1/3 rounded-lg flex justify-center items-center bg-blue-950 opacity-70"}>
                <h1 className={"text-white text-3xl font-bold"}>Hi! Welcome to Project Flow</h1>
            </div>

        </div>
    );
};

export default Home;
