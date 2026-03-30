'use client'
import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client'

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () =>{
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error('useSocket must be within a Socket provider');
    } return socket;
}

export const SocketProvider  = ({children}: {children: ReactNode}) =>{
    const socketRef = useRef<Socket | null>(null);

    useEffect(()=>{
        if (!socketRef.current) {
            socketRef.current = io('http://localhost:9002')
        }
    },[]);

    return(
        <SocketContext.Provider value={socketRef.current}>
            {children} 
        </SocketContext.Provider>
    )
}