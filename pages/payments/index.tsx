import { checkout } from '@/api/payments';
import { loadStripe } from '@stripe/stripe-js';
import router from 'next/router';
import React, { useState } from 'react';

loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_API_KEY
);

export default function Payment() {
  const [selectedPrize, setSelectedPrize] = useState("");

  const handlePrizeClick = async (prize: string) => {
    setSelectedPrize(prize);

    // Calling the checkout function and awaiting the returned URL
    const url = await checkout({ prize: prize, quantity: 1 });
    
    // Redirecting to the URL
    router.push(url);
  };

  return (
    <div className="container text-center" style={{ backgroundColor: '#212529', minHeight: '100vh' }}>
      <h1 className="text-white mt-5">Select Your Prize</h1>
      <div className="mt-5">
        <button
          className="btn btn-dark m-2"
          style={{ backgroundColor: '#00FFAB', borderColor: '#00FFAB' }}
          onClick={() => handlePrizeClick("price_1NdUDIAom1IgIvKKmDRjzFiC")}
        >
          50
        </button>
        <button
          className="btn btn-dark m-2"
          style={{ backgroundColor: '#00FFAB', borderColor: '#00FFAB' }}
          onClick={() => handlePrizeClick("price_1NdZOtAom1IgIvKK5pWX5HLN")}
        >
          100
        </button>
        <button
          className="btn btn-dark m-2"
          style={{ backgroundColor: '#00FFAB', borderColor: '#00FFAB' }}
          onClick={() => handlePrizeClick("price_1NdZPiAom1IgIvKKW9YdtmZQ")}
        >
          200
        </button>
        <button
          className="btn btn-dark m-2"
          style={{ backgroundColor: '#00FFAB', borderColor: '#00FFAB' }}
          onClick={() => handlePrizeClick("price_1NdZQTAom1IgIvKK0LMh6cgS")}
        >
          300
        </button>
      </div>
      {selectedPrize && (
        <div className="text-white mt-4">
          <h3>Selected Prize: {selectedPrize}</h3>
        </div>
      )}
    </div>
  );
}
