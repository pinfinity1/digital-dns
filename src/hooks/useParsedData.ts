"use client"
import {useEffect, useState} from "react";


export const useParsedData = <T> (data: string | T): T | null => {
    const [parsedData, setParsedData] = useState<T | null>(null);
    
    useEffect(() => {
        try {
            setParsedData(typeof data === "string" ? JSON.parse(data) : data);
        } catch (error) {
            console.error("error parse data", error);
            setParsedData(null);
        }
    }, [data]);
    
    return parsedData;
};
