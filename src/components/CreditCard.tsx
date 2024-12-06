import React from 'react';
import { motion } from 'framer-motion';

interface CreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  isFlipped: boolean;
}

const getCardType = (number: string) => {
  const firstDigit = number.charAt(0);
  const firstTwoDigits = number.slice(0, 2);

  if (firstDigit === '3') return 'amex';
  if (firstDigit === '4') return 'visa';
  if (firstDigit === '5' && ['51', '52', '53', '54', '55'].includes(firstTwoDigits)) return 'mastercard';
  if (firstDigit === '6') return 'discover';
  return 'generic';
};

const formatCardNumber = (number: string) => {
  if (!number) return '•••• •••• •••• ••••';
  const cleaned = number.replace(/\s+/g, '');
  const chunks = cleaned.match(/.{1,4}/g) || [];
  return chunks.join(' ').padEnd(19, '•');
};

const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  isFlipped
}) => {
  const cardType = getCardType(cardNumber);

  return (
    <div className="perspective-1000 w-[280px] h-[178px]">
      <motion.div
        className="relative w-full h-full transition-transform duration-700 transform-style-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Frente do cartão */}
        <div className="absolute w-full h-full backface-hidden">
          <div
            className={`w-full h-full rounded-xl p-6 shadow-lg bg-gradient-to-br ${
              cardType === 'visa' ? 'from-blue-600 to-blue-800' :
              cardType === 'mastercard' ? 'from-red-600 to-orange-600' :
              cardType === 'amex' ? 'from-gray-600 to-gray-800' :
              cardType === 'discover' ? 'from-orange-400 to-orange-600' :
              'from-gray-700 to-gray-900'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-8">
                {/* Logos das bandeiras */}
                {cardType === 'visa' && (
                  <svg className="w-full h-full text-white" viewBox="0 0 48 48" fill="currentColor">
                    <path d="M32 42H16c-5.5 0-10-4.5-10-10V16c0-5.5 4.5-10 10-10h16c5.5 0 10 4.5 10 10v16c0 5.5-4.5 10-10 10zM16 8C11.6 8 8 11.6 8 16v16c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V16c0-4.4-3.6-8-8-8H16z"/>
                    <path d="M36 16l-2 10h-3l2-10h3zm-7 0l-2 10h-3l2-10h3zm-7 0l-2 10h-3l2-10h3zm-7 0l-2 10h-3l2-10h3z"/>
                  </svg>
                )}
                {cardType === 'mastercard' && (
                  <div className="flex">
                    <div className="w-6 h-6 bg-red-500 rounded-full opacity-80" />
                    <div className="w-6 h-6 bg-yellow-500 rounded-full -ml-3 opacity-80" />
                  </div>
                )}
                {cardType === 'amex' && (
                  <div className="text-white font-bold text-sm">AMEX</div>
                )}
                {cardType === 'discover' && (
                  <div className="text-white font-bold text-sm">DISCOVER</div>
                )}
              </div>
              <div className="w-8 h-8">
                <svg className="w-full h-full text-white opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
            </div>

            <div className="mt-8 text-white text-xl tracking-wider font-mono">
              {formatCardNumber(cardNumber)}
            </div>

            <div className="mt-4 flex justify-between">
              <div>
                <div className="text-xs text-gray-200 uppercase">Card Holder</div>
                <div className="text-white font-medium tracking-wider text-sm">
                  {cardHolder || '•••• ••••'}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-200 uppercase">Expires</div>
                <div className="text-white font-medium tracking-wider text-sm">
                  {expiryDate || '••/••'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verso do cartão */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className={`w-full h-full rounded-xl shadow-lg bg-gradient-to-br ${
            cardType === 'visa' ? 'from-blue-600 to-blue-800' :
            cardType === 'mastercard' ? 'from-red-600 to-orange-600' :
            cardType === 'amex' ? 'from-gray-600 to-gray-800' :
            cardType === 'discover' ? 'from-orange-400 to-orange-600' :
            'from-gray-700 to-gray-900'
          }`}>
            <div className="w-full h-10 bg-black mt-6" />
            <div className="px-6 mt-6">
              <div className="bg-white h-10 rounded flex items-center justify-end pr-4 transform -scale-x-100">
                <div className="text-gray-900 font-mono text-lg transform -scale-x-100">
                  {cvv || '•••'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreditCard;
