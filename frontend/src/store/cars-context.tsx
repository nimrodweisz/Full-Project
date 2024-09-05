import React, { createContext, useContext, useState, useEffect } from "react";
import { Car } from "../Utils/thingsTypes";

interface DashboardContextProps {
    dashboardData: Car[];
    status: number; // Added status property to the interface
    updateCarId: (id: string | undefined) => void;
}

export const CarContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [dashboardData, setDashboardData] = useState<Car[]>([]);
    const [status, setStatus] = useState<number>(0); // New state for holding the status code
    const [carId, setCarId] = useState<string | undefined>(); 
  
    useEffect(() => {
        fetchDashboardData();
    }, [carId]);

    const fetchDashboardData = async () => {
        try {
            const resData = await fetch("http://localhost:5000/cars", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userIde: carId }),
            });

            const statusCode = resData.status; // Extract the status code from the response
            setStatus(statusCode); // Update the status state with the extracted code

            const data = await resData.json();
            setDashboardData(data);
        } catch (err) {
            console.log(err);
        }
    };

    const updateCarId = async (newId: string | undefined) => {
        setCarId(newId);
        fetchDashboardData();
    };

    return (
        <CarContext.Provider value={{ dashboardData, status, updateCarId }}>
            {children}
        </CarContext.Provider>
    );
};

export const useDashboard = (): DashboardContextProps => {
    const context = useContext(CarContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};
