import React, {useEffect, useState} from "react";
import {getApiV1AgentProfitReportOptions} from "@/client/@tanstack/react-query.gen";
import {useQuery} from "@tanstack/react-query";
import {Loading} from "@/components/loading/Loading";
import {CartesianGrid, Line, LineChart, XAxis} from "recharts"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {AgentIncomeDto} from "@/client";
import {ChevronsDown, ChevronsUp} from "lucide-react";


const chartConfig = {
    profitLabel: {
        label: "فروش",
    },
    profit: {
        label: "سود"
    },
} satisfies ChartConfig


export default function SalesGrowth () {
    const [chartData, setChartData] = useState<AgentIncomeDto[]>([]);
    const [growPercent, setGrowPercent] = useState<number>(null);
    const [totalProfit, setTotalProfit] = useState<number>(null);
    
    
    const {data, isLoading, error} = useQuery(
        getApiV1AgentProfitReportOptions(
            {
                query: {
                    TakeEntity: 0
                }
            }
        )
    )
    
    useEffect(() => {
        if(data) {
            try {
                const parsedData = typeof data === "string" ? JSON.parse(data) : data
                if(parsedData) {
                    const reversedEntities = parsedData.data.entities.reverse();
                    setChartData(reversedEntities);
                    
                    
                    const firstPrice = Number(reversedEntities[0]?.profit);
                    const lastPrice = Number(reversedEntities[reversedEntities.length - 1]?.profit);
                    
                    if(firstPrice && lastPrice) {
                        const calculatedGrowPercent = ((lastPrice - firstPrice) / firstPrice) * 100;
                        setGrowPercent(calculatedGrowPercent);
                    }
                    
                    const totalPrice = reversedEntities?.reduce((sum, item) => sum + Number(item.profit), 0);
                    setTotalProfit(totalPrice);
                }
            } catch (error) {
                console.error("Error getting admin agent information", error);
            }
        }
    }, [data]);
    
    if(isLoading) {
        return (
            <div
                className={"col-span-12 lg:col-span-8 xl:col-span-6 w-full h-[280px] flex flex-col border rounded-xl shadow space-y-1"}>
                <div className={"w-full h-[52px] flex items-center justify-between border-b px-6 shadow-sm"}>
                    <h3 className={"w-24 h-8 rounded-md bg-black/30 animate-pulse"}></h3>
                </div>
                <div className={"w-full flex-1 flex items-center justify-center"}>
                    <Loading/>
                </div>
            </div>
        )
        
    }
    
    if(error) {
        return <div>Error {error instanceof Error ? error.message : "Unknown error"}</div>;
    }
    
    
    return (
        <div
            className={"col-span-12 lg:col-span-8 xl:col-span-6 w-full border rounded-xl shadow space-y-1"}>
            <div className={"w-full h-[52px] flex items-center justify-between border-b px-6 shadow-sm"}>
                <h3 className={"font-semibold"}>رشد فروش</h3>
            </div>
            <div className={"px-8 py-4 w-full h-full"}>
                <div className={"sm:flex items-center gap-8 text-[14px] sm:text-base"}>
                    <div className={"mb-4 flex items-center gap-1 sm:gap-1"}>
                        <p>فروش کل:</p>
                        <p>{totalProfit?.toLocaleString("fa-IR")} <span className={""}>تومان</span></p>
                    </div>
                    <div className={"mb-4 flex items-center gap-1 sm:gap-1"}>
                        <p>سود فروش:</p>
                        <p className={`${growPercent > 0 ? "text-green-600" : "text-red-600"} flex items-center`}>
                            <span className={"pl-1"}>%</span>
                            {growPercent?.toFixed(2)}
                            <span>
                            {growPercent > 0 ? <ChevronsUp size={14} className={"mb-0.5"}/> :
                                <ChevronsDown size={14} className={"mb-0.5"}/>}
                            </span>
                        </p>
                    </div>
                </div>
                <ChartContainer className={"w-full max-h-[320px]"} config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="createDate"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            className={"hidden sm:block"}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("fa-IR", {
                                    month: "numeric",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                className="w-[150px]"
                                labelFormatter={(value) => new Date(value).toLocaleDateString("fa-IR")}
                                indicator={"line"}/>}
                        />
                        <Line
                            dataKey="profit"
                            type="natural"
                            stroke="#000"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
        </div>
    )
}