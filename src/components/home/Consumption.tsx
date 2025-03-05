import React from "react";


const chartData = [
    {browser: "safari", visitors: 200, fill: "var(--color-safari)"},
]

export default function Consumption () {
    return (
        <div className={"col-span-6 w-full h-[280px] border rounded-xl shadow space-y-1"}>
            <div className={"w-full h-[52px] flex items-center justify-between border-b px-6 shadow-sm"}>
                <h3 className={"font-semibold"}>اطلاعات خرید</h3>
            </div>
            <div className={"px-8 py-4 w-full h-full"}>
            
            </div>
        </div>
    )
}