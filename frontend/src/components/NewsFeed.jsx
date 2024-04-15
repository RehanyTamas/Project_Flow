import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppConfig from "../config";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [token,setToken] = useState(null);

    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));
    },[])

    useEffect(() => {
        if (token != null) {
            fetchNotifications();

            const axiosInterceptor = axios.interceptors.request.use(async (config) => {

                if (!config.url.endsWith('/api/calendar') && !config.url.endsWith('/api/notifications')) {
                    await fetchNotifications();
                }
                return config;
            });

            return () => {
                axios.interceptors.request.eject(axiosInterceptor);
            };
        }
    }, [token]);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/notifications`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await axios.delete(`${AppConfig.backendUrl}/api/notifications/${id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            // Update notifications after deletion
            setNotifications(notifications.filter(notification => notification.id !== id));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mt-4 mb-8 pl-2">Notifications</h1>
            <div className="overflow-auto max-h-3 " style={{ maxHeight: '400px' }}>
                <div className="grid grid-cols-1 gap-4">
                    {notifications.map(notification => (
                        <div key={notification.id} className="relative bg-blue-800 shadow-md rounded-md left-2 right-2 h-14 max-w-prose flex items-center justify-between">
                            <p className="pl-2 pr-8 font-semibold mb-2 break-words">{getNotificationText(notification)}</p>
                            <button
                                className="absolute top-0 right-0 text-xl px-2 py-1 text-white font-bold bg-transparent border-none"
                                onClick={() => deleteNotification(notification.id)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

const getNotificationText = (notification) => {
    switch (notification.action) {
        case 'teammember_assignment':
            return `You have been assigned to project "${notification.project.name}"`;
        case 'teammember_deassignment':
            return `You have been removed from project "${notification.project.name}"`;
        case 'task_assignment':
            return `You have been assigned to task "${notification.task.name}" in project "${notification.project.name}"`;
        case 'task_deassignment':
            return `You have been removed from task "${notification.task.name}" in project "${notification.project.name}"`;
        case 'task_status_change':
            return `Task "${notification.task.name}" in project "${notification.project.name}"  has changed status`;
        default:
            return 'Unknown notification';
    }
};

export default Notifications;
