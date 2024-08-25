"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { error } from "console"

// Define the Zod schema
const formSchema = z.object({
    bankCardName: z.string().min(1, "Bank card name is required"),
    cardNumber: z.string().length(16, "Card number must be exactly 16 digits"),
    cardType: z.enum(['MasterCard', 'Visa', 'Rupay']),
    expiryMonth: z.string().min(2, "Month must be between 1 and 12").max(12),
    expiryYear: z.string().min(2, "Year cannot be in the past"),
    cvv: z.string().length(3, "CVV must be exactly 3 digits"),
    pin: z.string().length(4, "PIN must be exactly 4 digits"),
})

export default function cardForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bankCardName: "",
            cardNumber: "",
            cardType: undefined,
            expiryMonth: undefined,
            expiryYear: undefined,
            cvv: "",
            pin: "",
        },
    })
    const onInvalid = (error) => console.error(error)
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="border p-8">
            <Form{...form}>
                <form onSubmit={form.handleSubmit(onSubmit,onInvalid)}>

                    <FormField
                        control={form.control}
                        name="bankCardName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Card Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="XXXXXXXXXXXX1234" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Card Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Card Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="MasterCard">MasterCard</SelectItem>
                                        <SelectItem value="Visa">Visa</SelectItem>
                                        <SelectItem value="Rupay">Rupay</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                    <FormField
                        control={form.control}
                        name="expiryMonth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expiry Month:</FormLabel>
                                <FormControl>
                                    <Input placeholder="MM" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="expiryYear"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expiry Year:</FormLabel>
                                <FormControl>
                                    <Input placeholder="YY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                

                    <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CVV:</FormLabel>
                                <FormControl>
                                    <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>PIN Code:</FormLabel>
                                <FormControl>
                                    <Input placeholder="1234" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className='mt-7' type="submit">Submit</Button>
                </form>
            </Form >
        </div>
    )
}