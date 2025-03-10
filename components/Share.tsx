"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Share = () => {
  const router = useRouter();

  useEffect(() => {
    // WhatsApp Share Message
    const text = `Maine 'Shankh' par ek sunder bhajan suna, aap bhi suniye! ✨\n\nBhakti ka anand lene ke liye yahan click karein: https://wame.pro/shankh 🙏\n\nBhagwan ki kripa aap par sada bani rahe! 🌸\nHari Om!`;

    // Check if the user is on mobile or desktop
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    const encodedText = encodeURIComponent(text);

    // Select the appropriate WhatsApp URL based on the device
    const whatsappUrl = isMobile
      ? `whatsapp://send?text=${encodedText}`
      : `https://web.whatsapp.com/send?text=${encodedText}`;

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
  }, []);
  return <div>Redirecting to WhatsApp...</div>;
};

export default Share;
