"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Poppins, Sora } from "next/font/google";
import Image from "next/image";
import JazzCashLanding from "../components/JazzCashLanding";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const BRAND = {
  pink: "#C84C63",
  purple: "#6B2D85",
};

const TiktokScript = `!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


  ttq.load('D9PJ1BBC77UFAJG525P0');
  ttq.page();
}(window, document, 'ttq');`;

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

  useEffect(() => {
    if (isConversion) {
      const script = document.createElement("script");
      script.innerHTML = TiktokScript;
      document.head.appendChild(script);
      console.log("TiktokScript subscribe event added ");

      // @ts-expect-error
      window?.ttq?.track("Subscribe");

    }
  }, [isConversion]);

  const handleContinueClick = () => {
    const ua = window.navigator.userAgent;
    const playStore = "https://play.google.com/store/apps/details?id=com.busuu.android.enc";
    const appStore = "https://apps.apple.com/pk/app/busuu-language-learning/id379968583";
    window.open(/iphone|ipad|ipod/i.test(ua) ? appStore : playStore, "_blank");
  };

  return (
    <div className={`${poppins.className} min-h-screen w-full`}>
      <div className={modalOpen ? "pointer-events-none blur-[6px]" : ""}>
        <JazzCashLanding />
      </div>

      {modalOpen && isSuccess !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-95 rounded-3xl bg-[#F9F9F9] px-8 py-6 shadow-2xl max-sm:px-4 max-sm:py-4">
            <div className="mb-5 flex items-center justify-between">
              <Image
                src="/womenworldlogo.webp"
                alt="Women World"
                width={72}
                height={72}
                className="h-auto w-14"
              />
              <button
                type="button"
                onClick={() => router.push("/jazzcash-tiktok")}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#888] hover:bg-[#FCE8EB] "
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white" />
                  <circle cx="12" cy="12" r="11.75" stroke="black" strokeOpacity="0.08" strokeWidth="0.5" />
                  <path d="M15.0832 9.4831L12.5664 11.9999L15.0832 14.5167C15.2392 14.6727 15.2392 14.9263 15.0832 15.0823C15.0048 15.1607 14.9024 15.1991 14.8 15.1991C14.6976 15.1991 14.5952 15.1599 14.5168 15.0823L12 12.5655L9.48323 15.0823C9.40483 15.1607 9.30242 15.1991 9.20003 15.1991C9.09763 15.1991 8.99522 15.1599 8.91682 15.0823C8.76083 14.9263 8.76083 14.6727 8.91682 14.5167L11.4336 11.9999L8.91682 9.4831C8.76083 9.3271 8.76083 9.0735 8.91682 8.9175C9.07282 8.7615 9.32642 8.7615 9.48242 8.9175L11.9992 11.4343L14.516 8.9175C14.672 8.7615 14.9256 8.7615 15.0816 8.9175C15.2376 9.0735 15.2376 9.3271 15.0816 9.4831H15.0832Z" fill="black" />
                </svg>

              </button>
            </div>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  src="/success.png"
                  alt="Congratulations"
                  width={130}
                  height={130}
                  className="mb-4 h-auto w-28"
                />
                <h2 className="text-[22px] font-bold text-[#3D3D3D]">Congratulations</h2>
                <p className="mb-4 text-[12px] leading-relaxed text-[#575757]">
                  You&apos;ve successfully subscribed to Women World.
                </p>

                <button
                  type="button"
                  onClick={handleContinueClick}
                  className="mb-4 mt-1 w-full rounded-xl px-4 py-3 font-semibold tracking-wide text-white hover:opacity-90"
                  style={{ backgroundColor: BRAND.pink }}
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
                  <h2 className="text-[22px] font-bold text-[#3D3D3D]">Error</h2>
                  <p className="text-[14px] leading-relaxed text-[#575757]">
                    Oops! Unable to verify wallet details. Contact our helpline for assistance.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/jazzcash-tiktok")}
                  className="mt-1 w-full rounded-xl px-4 py-3 font-semibold tracking-wide text-white hover:opacity-90"
                  style={{ backgroundColor: BRAND.pink }}
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
    <Suspense fallback={<div className={`${poppins.className} min-h-screen w-full bg-[#f7f7f8]`} />}>
      <JazzCashSuccessContent />
    </Suspense>
  );
}
