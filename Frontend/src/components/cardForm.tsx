"use client"

import DebitCardForm from "./forms/debitCardForm"
import CreditCardForm from "./forms/creditCardForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CardForm() {
    return (
        <div className="border p-8 shadow-xl">
            <Tabs defaultValue="creditCard">
                <TabsList>
                    <TabsTrigger value="creditCard">Credit Card</TabsTrigger>
                    <TabsTrigger value="debitCard">Debit Card</TabsTrigger>
                </TabsList>
                <TabsContent value="creditCard">
                    <CreditCardForm/>
                </TabsContent>
                <TabsContent value="debitCard">
                    <DebitCardForm/>
                </TabsContent>
            </Tabs>
        </div>
    )

}