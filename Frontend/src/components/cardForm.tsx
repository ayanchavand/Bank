"use client"


import { useState } from "react"

import DebitCardForm from "./forms/debitCardForm"
import CreditCardForm from "./forms/creditCardForm"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectGroup,
    SelectValue,
} from "@/components/ui/select"

export default function CardForm() {

    const [isCredit, setIsCredit] = useState(true)

    return (
        <div className="border p-8">
            <Select onValueChange={(value) => {
                (value === "Credit Card") ? setIsCredit(true) : setIsCredit(false)
                console.log(isCredit)
            }}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Credit Card" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Debit Card">Debit Card</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {isCredit ? <CreditCardForm /> : <DebitCardForm />}
        </div>
    )

}