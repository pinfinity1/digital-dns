"use client";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Eye, EyeOff} from "lucide-react";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import Image from "next/image";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


type FormData = {
    username: number;
    password: string;
};

export default function Login () {
    // const searchParams = useSearchParams();
    // console.log(searchParams.get('token'));
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    
    const router = useRouter();
    
    const form = useForm<FormData>({
        defaultValues: {
            username: 0,
            password: "",
        },
    });
    
    
    const loginSubmit = async (data: FormData) => {
        if(data.username !== 0 && data.password !== "") {
            setSubmitLoading(true);
            const chatId = +data.username
            const password = data.password;
            
            const loginData = {
                email: "",
                chatId: chatId,
                password: password,
            }
            
            try {
                const res = await signIn("credentials", {
                    ...loginData,
                    redirect: false
                })
                
                if(res?.error) {
                    toast.error("ورود ناموفق")
                } else {
                    toast.success("ورود موفق")
                    router.push("/")
                }
            } catch (error) {
                console.error(error)
                toast.warning("خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.");
            } finally {
                setSubmitLoading(false);
            }
        }
    };
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(loginSubmit)}
                autoComplete={"off"}
                className="w-full sm:max-w-[400px] space-y-6  md:shadow-2xl sm:border border-gray-100 rounded-2xl py-8 px-6"
            >
                <div className={"flex justify-center items-center"}>
                    <Image src={"/icons/Digital-512.png"} alt={"logo"} width={80} height={80} priority/>
                </div>
                {/*<p className="text-center">خوش آمدید</p>*/}
                
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>نام کاربری</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type={"number"}
                                    placeholder="نام کاربری"
                                    value={field.value === 0 ? "" : field.value}
                                    className={
                                        "w-full py-5 text-base rounded-xl border focus:outline-none"
                                    }
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>رمز عبور</FormLabel>
                            <FormControl>
                                <div className={"relative"}>
                                    <Input
                                        {...field}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="رمز عبور"
                                        value={field.value === "" ? "" : field.value}
                                        className={
                                            "w-full py-5 text-base rounded-xl border focus:outline-none"
                                        }
                                    />
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="group absolute inset-y-0 left-0 pl-3 flex items-center text-sm leading-5 cursor-pointer"
                                    >
                    {showPassword ? (
                        <Eye className="h-4 w-4 text-pr-green-60"/>
                    ) : (
                        <EyeOff className="h-4 w-4 text-grey-shade-35 group-hover:text-pr-green-60"/>
                    )}
                  </span>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className={"w-full"} disabled={submitLoading}>
                    ورود
                </Button>
            </form>
        </Form>
    );
}
