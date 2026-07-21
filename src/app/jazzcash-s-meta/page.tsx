"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Sora } from "next/font/google";
import Image from "next/image";
import JazzCashLanding from "../components/JazzCashLanding";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = "1000950782856119";
function JazzCashSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);

  const hasSuccessParam = searchParams?.has("success");
  const isSuccess = hasSuccessParam ? searchParams?.get("success") === "true" : null;
  const successNumber = searchParams?.get("msisdn") || searchParams?.get("number");
  const isConversion = isSuccess === true && Boolean(successNumber);

  useEffect(() => {
    setModalOpen(hasSuccessParam);
  }, [hasSuccessParam]);

  const metaPixelScript = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
${isConversion ? "fbq('track', 'Subscribe', { value: 1, currency: 'PKR' });" : ""}`;

  const handleContinueClick = () => {
    const ua = window.navigator.userAgent;
    const playStore = "https://play.google.com/store/apps/details?id=com.busuu.android.enc";
    const appStore = "https://apps.apple.com/pk/app/busuu-language-learning/id379968583";
    window.open(/iphone|ipad|ipod/i.test(ua) ? appStore : playStore, "_blank");
  };

  return (
    <div className={`${sora.className} min-h-screen w-full`}>
      <Script id="meta-pixel" strategy="afterInteractive">
        {metaPixelScript}
      </Script>

      {/* ── Background: same landing design as /jazzcash ── */}
      <div className={modalOpen ? "pointer-events-none blur-[6px]" : ""}>
        <JazzCashLanding />
      </div>

      {/* ── Modal popup ── */}
      {modalOpen && isSuccess !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-95 rounded-3xl bg-white px-8 py-6 max-sm:px-4 max-sm:py-2 shadow-2xl">
            {/* Logo + Close row */}
            <div className="mb-5 flex items-center justify-between">
              <Image src="/busuu.webp" alt="Busuu" width={100} height={100} className="h-auto" />
              <button
                type="button"
                onClick={() => router.push('/jazzcash-meta')}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#888] hover:bg-gray-100"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center  text-center">
                <Image src="/success.png" alt="Congratulations" width={130} height={130} className="h-auto w-28 mb-4" />
                <div className="">
                  <h2 className="text-[22px] font-bold text-[#111111]">Congratulations</h2>
                  <p className="text-[14px] leading-relaxed text-[#181515]">
                    You&apos;ve successfully subscribed with Busuu.
                  </p>
                </div>
                <div className=" text-center mb-4 mt-2">
                  {/* <p className="text-[18px] font-semibold text-[#111111]">You&apos;re All Set!</p> */}
                  <p className="text-[14px] leading-relaxed text-[#0c0b0b]">
                   Log in with your mobile number
                  </p>
                  <a href="https://www.busuu.com/forgot-password" target="_blank" rel="noopener noreferrer" className="text-[14px] font-medium text-blue-600 underline ">
                    Set your own password
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleContinueClick}
                  className="mt-1 w-full rounded-xl bg-[#116EEE] text-white px-4 py-3 mb-4 font-semibold tracking-wide  hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5 text-center">
                <Image
                  src="/error.png"
                  alt="Error"
                  width={110}
                  height={110}
                  className="h-auto w-28"
                />
                <div className="space-y-1.5">
                  <h2 className="text-[22px] font-bold text-[#111111]">Error</h2>
                  <p className="text-[14px] leading-relaxed text-[#575757]">
                    Oops! Unable to verify wallet details. Contact our helpline for assistance.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push('/jazzcash-meta')}
                  className="mt-1 w-full rounded-xl bg-[#116EEE] text-white px-4 py-3 font-semibold tracking-wide hover:opacity-90"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function JazzCashSuccessPage() {
  return (
    <Suspense fallback={<div className={`${sora.className} min-h-screen w-full bg-[#f7f7f8]`} />}>
      <JazzCashSuccessContent />
    </Suspense>
  );
}
