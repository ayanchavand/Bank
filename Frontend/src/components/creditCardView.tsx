import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CreditCard, Calendar, Mail, Hash, Copy } from 'lucide-react';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';


const CopyButton = ({value, label}) =>{
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard.`,
      });
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };
  return (
    <Button variant="link" size="icon" onClick={handleCopy} className="ml-2">
      <Copy className='h-4 w-4'/>
    </Button>
  );


}

const CreditCardView = ({index, cardData }) => {
  const {
    bankCardName,
    cardNumber,
    cardType,
    expiryMonth,
    expiryYear,
    cvv,
    pin,
    mPin,
    email,
    upiId,
    upiPin,
    billDate,
    dueDate
  } = cardData;

  const maskCardNumber = (number: BigInteger) => {
    return '*'.repeat(12) + number.slice(-4);
  };

  return (
    <Card className="w-full max-w-md mx-auto" key={index}>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <span className="text-lg font-bold mb-2 sm:mb-0">{bankCardName}</span>
          <span className="text-2xl rounded px-2 py-1">{cardType}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <div className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            <span className="font-bold text-sm sm:text-base">{maskCardNumber(cardNumber)}
            <CopyButton value={cardNumber} label="Card Number"/>
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="text-sm">Expires: {expiryMonth}/{expiryYear}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <Hash className="mr-2 h-4 w-4" />
            <span className="text-sm">CVV: ***
            <CopyButton value={cvv} label="CVV"/>
            </span>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            <span className="text-sm break-all">{email}</span>
          </div>
        </div>
        <div>
          <span className="text-sm">PIN: {pin}</span>
        </div>
        <div>
          <span className="text-sm">mPIN: {mPin}</span>
        </div>
        <div>
          <span className="text-sm">UPI ID: {upiId}</span>
        </div>
        <div>
          <span className="text-sm">UPI PIN: {upiPin}</span>
        </div>
        <div>
          <span className="text-sm">Bill Date: {billDate}</span>
        </div>
        <div>
          <span className="text-sm">Due Date: {dueDate}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreditCardView;