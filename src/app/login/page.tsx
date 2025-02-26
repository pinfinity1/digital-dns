'use client'
import {useSearchParams} from "next/navigation";
import Login from "@/views/Login";


export default function LoginPage () {
    const searchParams = useSearchParams();
    console.log(searchParams.get("token"));
    
    return <Login/>
}
