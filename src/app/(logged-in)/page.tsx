"use client"

import PaymentInformation from "@/components/home/PaymentInformation";
import SalesGrowth from "@/components/home/SalesGrowth";
import AdminAgentInformation from "@/components/home/AdminAgentInformation";
import Consumption from "@/components/home/Consumption";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import AgentUsersList from "@/components/users/AgentUsersList";



export default function HomePage() {
    // const {hasPermission} = usePermission()

    {/*{hasPermission("GetTransactionDetails") && <PaymentInformation/>}*/
    }

    return (<>

        <Tabs dir="rtl" defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">نمایندگی</TabsTrigger>
                <TabsTrigger value="password">کاربران</TabsTrigger>
                <TabsTrigger value="reports">گزارشات</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>

                    <CardContent className="space-y-2">

                        <div className={"grid grid-cols-12 gap-6 mt-6"}>
                            <div className={"col-span-12 lg:col-span-6 grid grid-cols-6 gap-6"}>
                                <Consumption />
                                <PaymentInformation />
                                <AdminAgentInformation />
                            </div>
                            <div className={"col-span-12 lg:col-span-6"}>
                                <SalesGrowth />
                            </div>
                        </div>
                    </CardContent>

                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>

                    <CardContent >
                        <AgentUsersList />

                    </CardContent>

                </Card>
            </TabsContent>
            <TabsContent value="reports">
                <Card>
                    <CardHeader>
                        <CardTitle>Reports</CardTitle>
                        <CardDescription>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit culpa nisi cum eaque nulla doloribus. Ullam unde eaque ducimus atque!

                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                     
                    </CardContent>
                    <CardFooter>
                        {/* <Button>Save password</Button> */}
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>







    </>
    )
}