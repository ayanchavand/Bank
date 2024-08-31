import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addCreditData } from '../../utils/firebase'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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
import { toast } from "../ui/use-toast"

// Define the Zod schema
const creditFormSchema = z.object({
    bankCardName: z.string().min(1, "Bank card name is required"),
    cardNumber: z.string().length(16, "Card number must be exactly 16 digits"),
    cardType: z.enum(['MasterCard', 'Visa', 'Rupay']),
    expiryMonth: z.string().min(2, "Month must be between 1 and 12").max(12),
    expiryYear: z.string().min(2, "Year cannot be in the past"),
    cvv: z.string().length(3, "CVV must be exactly 3 digits"),
    pin: z.string().length(4, "PIN must be exactly 4 digits"),
    mPin: z.string(),
    email: z.string().email(),
    upiId: z.string().optional(),
    upiPin: z.string(),
    billDate: z.string(),
    dueDate: z.string(),

})

export default function CreditCardForm() {



    const creditForm = useForm<z.infer<typeof creditFormSchema>>({
        resolver: zodResolver(creditFormSchema),
        defaultValues: {
            bankCardName: "",
            cardNumber: "",
            cardType: undefined,
            expiryMonth: undefined,
            expiryYear: undefined,
            cvv: "",
            pin: "",
            mPin: "",
        },
    })

    const onInvalid = (error) => console.error(error)

    function onSubmit(values: z.infer<typeof creditFormSchema>) {
        console.log(values)
        addCreditData(values)
        toast({
            title: `${values.bankCardName} Added Successfully!`,
          });
    }


    return (
        <>
            <h1 className="text-4xl font-semibold my-6">Credit Card</h1>
            <Form{...creditForm}>

                <form onSubmit={creditForm.handleSubmit(onSubmit, onInvalid)}>
                    <FormField
                        control={creditForm.control}
                        name="bankCardName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank & Card Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={creditForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="XXXXXXXXXXXX1234" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={creditForm.control}
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
                            control={creditForm.control}
                            name="expiryMonth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expiry Month:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="MM" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={creditForm.control}
                            name="expiryYear"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expiry Year:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="YY" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    <FormField
                        control={creditForm.control}
                        name="cvv"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CVV:</FormLabel>
                                <FormControl>
                                    <Input placeholder="123" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={creditForm.control}
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


                    <FormField
                        control={creditForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Registered Email:</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@mail.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={creditForm.control}
                        name="upiId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>UPI ID:</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@bank" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={creditForm.control}
                        name="upiPin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>UPI Pin:</FormLabel>
                                <FormControl>
                                    <Input placeholder="1234/123456" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={creditForm.control}
                        name="billDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bill Date:</FormLabel>
                                <FormControl>
                                    <Input placeholder="DD/MM" type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={creditForm.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Date:</FormLabel>
                                <FormControl>
                                    <Input placeholder="DD/MM" type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className='mt-7' type="submit">Submit</Button>
                </form>
            </Form >
        </>
    )
}