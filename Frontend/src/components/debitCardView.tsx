import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CreditCard, Calendar, Mail, Hash, Copy, Trash, Edit } from 'lucide-react';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import ReactCardFlip from 'react-card-flip';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DebitCardView:FC<any> = ({ index, cardData, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const onCardDelete = () => {
    toast({
      title: 'Card removed'
    });
    onDelete(index);
  };

  const {
    bankCardName,
    accName,
    accNumber,
    ifscCode,
    branchName,
    cardNumber,
    cardType,
    expiryMonth,
    expiryYear,
    cvv,
    pin,
    userId,
    oldNetPass,
    newNetPass,
    mPin,
    oldTransPass,
    newTransPass,
    mobNum,
    email,
    upiId,
    upiPin,
  } = cardData;

  const maskCardNumber = (number: String) => {
    return '*'.repeat(12) + number.slice(-4);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [cardData]);

  return (
    <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
      <Card
        className="w-full max-w-xl border-double mx-auto bg-neutral-100 shadow-xl"
        key={index} onClick={() => { setIsFlipped(!isFlipped); }}>
        <CardHeader>
          <CardTitle
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <span className="text-lg font-bold mb-2 sm:mb-0">{bankCardName}</span>
            <span className="text-2xl rounded px-2 py-1">{cardType}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              <InteractiveWrapper>
                <span className="font-bold text-sm sm:text-base">{maskCardNumber(cardNumber)}
                  <CopyButton value={cardNumber} label="Card Number" />
                </span>
              </InteractiveWrapper>
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
              <InteractiveWrapper>
                <span className="text-sm">CVV: ***
                  <CopyButton value={cvv} label="CVV" />
                </span>
              </InteractiveWrapper>
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
          {accName && (
            <div>
              <span className="text-sm">Account Holder Name: {accName}</span>
            </div>
          )}
          {accNumber && (
            <div>
              <span className="text-sm">Account Number: {accNumber}</span>
            </div>
          )}
          {ifscCode && (
            <div>
              <span className="text-sm">IFSC Code: {ifscCode}</span>
            </div>
          )}
          {branchName && (
            <div>
              <span className="text-sm">Branch Name: {branchName}</span>
            </div>
          )}
          {mPin && <div><span className="text-sm">mPIN: {mPin}</span></div>}
          {upiId && <div><span className="text-sm">UPI ID: {upiId}</span></div>}
          {upiPin && <div><span className="text-sm">UPI PIN: {upiPin}</span></div>}
          {userId && <div><span className="text-sm">User ID: {userId}</span></div>}
          {oldNetPass && <div><span className="text-sm">Old Net Password: {oldNetPass}</span></div>}
          {newNetPass && <div><span className="text-sm">New Net Password: {newNetPass}</span></div>}
          {oldTransPass && <div><span className="text-sm">Old Transaction Password: {oldTransPass}</span></div>}
          {newTransPass && <div><span className="text-sm">New Transaction Password: {newTransPass}</span></div>}
          {mobNum && <div><span className="text-sm">Mobile Number: {mobNum}</span></div>}
        </CardContent>
      </Card>

      <Card
        className="w-full max-w-xl border-double mx-auto bg-neutral-100 shadow-xl"
        key={index} onClick={() => { setIsFlipped(!isFlipped); }}>
        <CardHeader>
          <CardTitle
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <span className="text-lg font-bold mb-2 sm:mb-0">{bankCardName}</span>
            <span className="text-2xl rounded px-2 py-1">{cardType}</span>
          </CardTitle>
        </CardHeader>
        <CardContent >
          <InteractiveWrapper>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' className='mx-5 mb-5 w-36'><Trash className='w-4 m-1' />Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onCardDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button variant='default' className=' w-36'><Edit className='w-4 m-1' />Edit</Button>
          </InteractiveWrapper>
        </CardContent>
      </Card>
    </ReactCardFlip>
  );
};

const CopyButton:FC<any> = ({ value, label }) => {
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
      <Copy className='h-4 w-4' />
    </Button>
  );
};

const InteractiveWrapper:FC<any> = ({ children }) => (
  <div onClick={(e) => e.stopPropagation()}>{children}</div>
);

export default DebitCardView;