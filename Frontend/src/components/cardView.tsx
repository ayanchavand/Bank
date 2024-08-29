import { getCreditCards } from "@/utils/firebase"
import { useEffect, useState } from "react"
import CreditCardView from "./creditCardView";

export default function CardView() {
    const [cardArr, setCardArr] = useState([])
    useEffect(() => {
        const fetchCreditCards = async () => {
            try {
                const cards = await getCreditCards();
                setCardArr(cards);
                console.log(cards);
            } catch (error) {
                console.error("Error in useEffect while fetching credit cards:", error);
            }
        };

        fetchCreditCards()
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {cardArr.map((cardDetail, index) => (
        <div key={index} className="p-2">
          <CreditCardView cardData={cardDetail} index={index}/>
        </div>
      ))}
    </div>
    )
}