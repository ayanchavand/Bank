import { getCreditCards, getDebitCards } from "@/utils/firebase"
import { useEffect, useState } from "react"
import CreditCardView from "@/components/creditCardView";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function CardView() {
    const [creditCardArr, setCreditCardArr] = useState([])
    const [debitCardArr, setDebitCardArr] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCards = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [creditCards, debitCards] = await Promise.all([
                    getCreditCards(),
                    getDebitCards()
                ]);
                setCreditCardArr(creditCards || []);
                setDebitCardArr(debitCards || []);
            } catch (error) {
                console.error("Error fetching cards:", error);
                setError("Failed to fetch card data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchCards();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Credit Cards</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                            {(creditCardArr.length === 0) ? <h1> No data found</h1>:
                            creditCardArr.map((cardDetail, index) => (
                                <div key={index} className="p-2">
                                    <CreditCardView cardData={cardDetail} index={index} />
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Debit Cards</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                            {(debitCardArr.length === 0) ? <h1> No data found</h1>:
                            debitCardArr.map((cardDetail, index) => (
                                <div key={index} className="p-2">
                                    <CreditCardView cardData={cardDetail} index={index} />
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}