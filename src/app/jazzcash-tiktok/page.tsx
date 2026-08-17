"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import CryptoJS from "crypto-js";
import { Bebas_Neue, Poppins } from "next/font/google";
import Image from "next/image";
import { checkSubscriberWw } from "@/apis/request";
import { devopsLog } from "@/utils/devopsLog";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

const SERVICE = "WomenWorld";
const LANDING = "jazzcash-tiktok";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const bebasneue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"]
})

const META_PIXEL_ID = "1000950782856119";
const META_PIXEL_SCRIPT = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

const BRAND = {
  pink: "#C84C63",
  purple: "#6B2D85",
};

const IconCycle = () => (
  <svg className="h-full w-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="8" width="28" height="26" rx="4" fill="#FCE8EB" stroke="#C84C63" strokeWidth="1.8" />
    <path d="M6 14h28" stroke="#C84C63" strokeWidth="1.8" />
    <path d="M13 5v6M27 5v6" stroke="#C84C63" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M20 22c0-3.2 2.8-5.2 2.8-5.2S25.6 18.8 25.6 22c0 1.55-1.25 2.8-2.8 2.8S20 23.55 20 22Z" fill="#E23B4A" />
  </svg>
);

const IconInsights = () => (
  <svg className="h-full w-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6c-5 0-9 3.8-9 8.6 0 3.2 1.7 5.9 4.2 7.4V26a2 2 0 0 0 2 2h5.6a2 2 0 0 0 2-2v-4c2.5-1.5 4.2-4.2 4.2-7.4C29 9.8 25 6 20 6Z" fill="#F6E8A8" stroke="#E8B923" strokeWidth="1.6" />
    <path d="M16.5 30h7M17.5 33h5" stroke="#E8B923" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="20" cy="15" r="2.2" fill="#F5C518" />
  </svg>
);

const IconCommunity = () => (
  <svg className="h-full w-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="4.2" fill="#8B6AD4" />
    <circle cx="26" cy="14" r="4.2" fill="#C84C63" />
    <circle cx="20" cy="18" r="4.5" fill="#6B2D85" />
    <path d="M7 30c0-3.5 3.1-6.2 7-6.2M33 30c0-3.5-3.1-6.2-7-6.2M12.5 30c0-4 3.4-7 7.5-7s7.5 3 7.5 7" stroke="#6B2D85" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const IconSos = () => (
  <svg className="h-full w-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24h16l-1.5-8.5a6.5 6.5 0 0 0-13 0L12 24Z" fill="#FF6B6B" />
    <rect x="10" y="24" width="20" height="5" rx="2" fill="#E23B4A" />
    <path d="M20 6v3.5M11 9.5l2.2 2.2M29 9.5l-2.2 2.2" stroke="#E23B4A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="18" r="2" fill="white" />
  </svg>
);

const FEATURES = [
  { icon: IconCycle, label: "Cycle<br/> Tracking" },
  { icon: IconInsights, label: "Personalised<br /> Insights" },
  { icon: IconCommunity, label: "Supportive<br /> Communities" },
  { icon: IconSos, label: "SOS<br /> Assistance" },
];

export default function JazzCashPage() {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkedTerms] = useState(true);
  const [checkedPricing] = useState(true);
  const [apiError, setApiError] = useState("");
  const redirectFormRef = useRef<HTMLFormElement>(null);

  const JAZZCASH_ACTION_URL =
    "https://pgw.jazzcash.com.pk/WalletLinkingPortal/wallet/LinkWallet";

  const salt = "4tv9xbbda5";
  const ID = "10031039";
  const password = "6zv8x11324";
  const rurl = "https://apijc.womenworld.com.pk/jazzWalletCallback_tiktok";


  const generateHMAC = (data: string, key: string) => {
    return CryptoJS.HmacSHA256(data, key).toString(CryptoJS.enc.Hex);
  };

  const hasTrackedSubscribe = useRef(false);

  // useEffect(() => {
  //   fetch("http://fitflexapp.com/api/get_head_enrichment.php")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const number = data?.msisdn || data?.data;
  //       const statusOK = data?.status === 200 || data?.status === "200";

  //       if (statusOK && number) {
  //         setPhoneNumber(number.replace(/[^0-9]/g, ""));
  //       }
  //     })
  //     .catch(() => {
  //       // silent
  //     });
  // }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success") === "true";
    const number = params.get("number");

    if (!success || !number || hasTrackedSubscribe.current) return;
    window.fbq?.("track", "Subscribe");
    hasTrackedSubscribe.current = true;
  }, []);

  const generateReqID = (msisdn: string) => {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    return `ReqIdbusuuM${msisdn}${randomNumber}`;
  };

  const submitToJazzCash = (fields: Record<string, string>) => {
    const formEl = redirectFormRef.current;
    if (!formEl) {
      return { ok: false as const, error: "Something went wrong. Please try again later." };
    }

    Object.entries(fields).forEach(([name, value]) => {
      const input = formEl.querySelector(`input[name="${name}"]`) as HTMLInputElement | null;
      if (input) input.value = value;
    });

    const allFilled = Array.from(formEl.querySelectorAll("input[type='hidden']")).every(
      (input) => (input as HTMLInputElement).value.length > 0
    );

    if (!allFilled) {
      return { ok: false as const, error: "Something went wrong. Please try again later." };
    }

    formEl.submit();
    return { ok: true as const };
  };

  const finalizeProceed = async (msisdn: string) => {
    let jazzcashMsisdn = msisdn;
    if (jazzcashMsisdn.startsWith("92")) {
      jazzcashMsisdn = "0" + jazzcashMsisdn.slice(2);
    } else if (jazzcashMsisdn.startsWith("3") && jazzcashMsisdn.length === 10) {
      jazzcashMsisdn = "0" + jazzcashMsisdn;
    }

    const ppmsisdn = jazzcashMsisdn;
    const req = generateReqID(ppmsisdn);
    const hashstring = `${salt}&${ppmsisdn}&${ID}&${password}&${req}&${rurl}`;
    const hash = await generateHMAC(hashstring, salt);

    const formData = {
      pp_MerchantID: ID,
      pp_Password: password,
      pp_MSISDN: ppmsisdn,
      pp_RequestID: req,
      pp_ReturnURL: rurl,
      pp_SecureHash: hash,
    };

    return submitToJazzCash(formData);
  };

  const handleProceed = async () => {
    setApiError("");
    setLoading(true);

    let msisdn = phoneNumber.replace(/\D/g, "") || "unknown";
    let formSubmission: "yes" | "no" = "no";
    let event = "subscribe_button_clicked";
    let error = "none";

    try {
      if (!checkedTerms || !checkedPricing) {
        error = "Please agree to Terms and Conditions & Privacy Policy.";
        event = "validation_error";
        setApiError(error);
        return;
      }

      if (!phoneNumber) {
        msisdn = "unknown";
        error = "Please enter your number";
        event = "validation_error";
        setApiError(error);
        return;
      }

      const msisdnRaw = phoneNumber.replace(/\D/g, "");
      msisdn = msisdnRaw;
      if (msisdn.startsWith("92") && msisdn.length === 12) {
        // ok
      } else if (msisdn.startsWith("03") && msisdn.length === 11) {
        msisdn = "92" + msisdn.slice(1);
      } else if (msisdn.startsWith("3") && msisdn.length === 10) {
        msisdn = "92" + msisdn;
      } else {
        msisdn = msisdnRaw || "unknown";
        error = "Please enter a valid number";
        event = "validation_error";
        setApiError(error);
        return;
      }

      const res = await checkSubscriberWw(msisdn);
      const data = res.data;

      if (!res.ok || !data?.success) {
        error = /only for jazz/i.test(data?.message || "")
          ? "Only For Jazz User"
          : data?.message || "Other Network";
        event = "api_error";
        setApiError(error);
        error = `${error}${data?.message ? ` (${data.message})` : ""}`;
        return;
      }

      if (data?.status === "1" || data?.status === 1) {
        if (data?.package_id !== 1) {
          error = "You are already subscribed to service";
          event = "validation_error";
          setApiError(error);
          return;
        }
      }

      const submitResult = await finalizeProceed(msisdn);
      if (submitResult.ok) {
        formSubmission = "yes";
        event = "form_submission";
        error = "none";
      } else {
        event = "form_submit_failed";
        error = submitResult.error;
        setApiError(error);
      }
    } catch (err) {
      error = "Something went wrong. Please try again later.";
      event = "frontend_error";
      setApiError(error);
      error = `${error}${err instanceof Error ? ` (${err.message})` : ""}`;
    } finally {
      async function test() {
        await fetch("/api/log", {
          method: "POST",
          body: JSON.stringify({
            message: devopsLog({
              msisdn,
              service: `${SERVICE}/${LANDING}`,
              subscribe_clicked: "yes",
              form_submission: formSubmission,
              event,
              error,
            })
          }),
        });
      }

      test();
      setLoading(false);
    }
  };

  const normalizePhoneNumberInput = (value: string) => {
    let digits = value.replace(/\D/g, "");

    if (digits.startsWith("0092")) {
      digits = digits.slice(2);
    }

    if (digits.startsWith("92")) {
      return digits.slice(0, 12);
    }

    if (digits.startsWith("03")) {
      return digits.slice(0, 11);
    }

    if (digits.startsWith("3")) {
      return digits.slice(0, 10);
    }

    return digits.slice(0, 12);
  };

  const displayPhoneNumber = phoneNumber.startsWith("92") ? `+${phoneNumber}` : phoneNumber;

  const renderLogo = (mobile = false) => (
    <Image
      src="/womenworldlogo.png"
      alt="Women World"
      width={140}
      height={140}
      className={mobile ? "h-auto w-[50px]" : "h-auto w-[77px]"}
      priority
    />
  );

  const renderHeadline = (mobile = false) => (
    <div className={` ${bebasneue.className}  ${mobile ? "flex w-full flex-col items-center gap-1" : "flex flex-col gap-2"}`}>
      <span
        className={`relative z-10 block w-fit max-w-full break-words rounded-md lg:rounded-2xl text-center font-normal uppercase leading-tight text-white ${mobile ? "-rotate-3 px-4 py-2 text-[24px]" : "-rotate-2 px-8 py-2 text-[48px] xl:text-[52px]"
          }`}
        style={{ backgroundColor: BRAND.pink }}
      >
        One App for Period Tracking
      </span>
      <span
        className={`relative z-0 block w-fit max-w-full break-words rounded-md lg:rounded-2xl text-center font-normal uppercase leading-tight text-white ${mobile ? "-mt-1 -rotate-1 px-4 py-2 text-[24px]" : "-mt-2.5 rotate-0 px-8 py-2 text-[48px] xl:text-[52px]"
          }`}
        style={{ backgroundColor: BRAND.purple }}
      >
        Health, Safety &amp; Community
      </span>
    </div>
  );

  const renderFeatureGrid = (mobile = false) => (
    <div className={`grid grid-cols-2 ${mobile ? "gap-3 pr-3" : "gap-4 w-[490px]"}`}>
      {FEATURES.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className={`flex items-center gap-3 rounded-2xl border border-[#e6e6ea] bg-white ${mobile ? "p-4" : "p-5"
            }`}
        >
          <span className={`shrink-0 ${mobile ? "h-8 w-8" : "h-9 w-9"}`}>
            <Icon />
          </span>
          <span className={`font-semibold leading-snug text-[#232329] ${mobile ? "text-[13px]" : "text-[16px]"}`}
            dangerouslySetInnerHTML={{ __html: label }} >
          </span>
        </div>
      ))}
    </div>
  );

  const renderPhoneInput = (compact = false) => (
    <div
      className={`grid w-full grid-cols-[40px_1px_minmax(0,1fr)_auto] items-center rounded-2xl border border-[#e1e1e1] bg-white ${compact ? "h-[64px] px-5" : "h-[64px] px-6"
        }`}
    >
      <span className="flex items-center justify-start">
        <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.1078 16.7464L15.58 14.5246C15.3866 14.4302 15.1716 14.4103 14.9675 14.4679C14.7633 14.5255 14.581 14.6575 14.448 14.844L12.4429 17.649C9.29598 15.9502 6.76344 13.0505 5.27971 9.44732L7.72956 7.15146C7.89275 6.99949 8.00825 6.79078 8.05859 6.55692C8.10892 6.32307 8.09134 6.0768 8.0085 5.85541L6.06803 0.671212C5.97711 0.432558 5.81632 0.237704 5.61337 0.120251C5.41042 0.00279815 5.17804 -0.0298927 4.9563 0.0278157L0.751934 1.13872C0.538146 1.19524 0.347404 1.33307 0.210839 1.5297C0.0742738 1.72633 -4.9248e-05 1.97016 2.44832e-08 2.22138C2.44832e-08 14.0941 8.40468 23.6988 18.7579 23.6988C18.9774 23.6989 19.1904 23.6139 19.3623 23.4575C19.5341 23.3012 19.6545 23.0827 19.7039 22.8378L20.6741 18.0239C20.7242 17.7688 20.6951 17.5017 20.5917 17.2685C20.4883 17.0353 20.3172 16.8507 20.1078 16.7464Z" fill={BRAND.pink} />
        </svg>

      </span>
      <span className="h-7 w-px bg-[#e7e7e7]" />
      <input
        type="tel"
        inputMode="numeric"
        pattern="[+0-9 ]*"
        maxLength={13}
        className="min-w-0 bg-transparent pl-4 text-[17px] font-light text-[#7f7f86] outline-none placeholder:text-[#9a9aa0]"
        placeholder="+92 XXXXXXXXX"
        aria-label="Mobile number"
        value={displayPhoneNumber}
        onChange={(e) => {
          setPhoneNumber(normalizePhoneNumberInput(e.target.value));
        }}
      />
      <span className="flex items-center justify-end pl-3">
        <Image src="/jazzcashlogo.png" alt="JazzCash" width={92} height={30} className="h-auto w-[88px]" />
      </span>
    </div>
  );

  const renderSubscribeCard = (mobile = false) => (
    <div
      className={`w-full rounded-[28px] border border-[#e8d0d4] bg-[#F7F7F7] shadow-[0px_0px_18px_0px_#C84C6366] ${mobile ? "px-4 py-7" : "px-9 py-9"
        }`}
    >
      <h2 className={`font-semibold text-[#3D3D3D] ${mobile ? "text-[16px]" : "text-[19px]"}`}>
        Start Tracking Your Cycle Today
      </h2>
      <p className={`mt-1.5 text-[#898989] ${mobile ? "text-[10px]" : "text-[13px]"}`}>
        Enter your Jazz Cash number.
      </p>

      <div className="mt-5">{renderPhoneInput(mobile)}</div>

      {apiError ? <div className="mt-3 text-center text-sm font-semibold text-red-600">{apiError}</div> : null}

      <button
        className={`mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl font-bold text-white disabled:cursor-not-allowed disabled:opacity-70 ${mobile ? "h-[54px] text-[17px]" : "h-[58px] text-[18px]"
          }`}
        style={{ backgroundColor: BRAND.pink }}
        onClick={handleProceed}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          "Subscribe"
        )}
      </button>

      <div className={`mt-4 text-center text-[#3D3D3D] ${mobile ? "text-[14px]" : "text-[16px]"}`}>
        Rs 300/Month
      </div>

      <p className={`mt-2 text-center leading-relaxed text-[#272727] ${mobile ? "text-[11px]" : "text-[13px]"}`}>
        By proceeding you agree to{" "}
        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
          Terms &amp; Conditions
        </Link>
        ,{" "}
        <Link href="/privacypolicy" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        &amp; Auto-recursive payments
      </p>
    </div>
  );

  useEffect(() => {
    if (!analytics) return;

    logEvent(analytics, "jazzcash_tiktok_page_view");
  }, []);

  return (
    <div className={`${poppins.className} relative min-h-screen w-full overflow-x-hidden bg-white`}>
      <Script id="meta-pixel" strategy="afterInteractive">
        {META_PIXEL_SCRIPT}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* ── Decorative side curve (placeholder brand accent) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[18%] [clip-path:polygon(40%_0%,100%_0%,100%_100%,140%_100%)] sm:w-[13%] lg:w-[9%] lg:[clip-path:polygon(30%_0%,100%_0%,100%_100%,70%_100%)]"
        style={{ backgroundColor: BRAND.pink }}
      />

      {/* ── Desktop ── */}
      <div className="relative z-10 hidden w-full lg:block">
        <div className="mx-auto max-w-[1180px] px-6 pb-16 pt-12">
          {renderLogo()}

          <div className="mt-10 grid grid-cols-[1fr_420px] items-start gap-16">
            <div className="flex flex-col gap-10">
              {renderHeadline()}
              {renderFeatureGrid()}
            </div>

            <div className="flex flex-col gap-6">
              {renderSubscribeCard()}

            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="relative z-10 w-full px-4 pb-12 pt-10 lg:hidden">
        <div className="flex flex-col items-center gap-8">
          {renderLogo(true)}
          {renderHeadline(true)}
          <div className="w-full">{renderFeatureGrid(true)}</div>
          {renderSubscribeCard(true)}

        </div>
      </div>

      <form
        ref={redirectFormRef}
        method="POST"
        action={JAZZCASH_ACTION_URL}
        className="hidden"
      >
        <input type="hidden" name="pp_MerchantID" defaultValue="" readOnly />
        <input type="hidden" name="pp_Password" defaultValue="" readOnly />
        <input type="hidden" name="pp_MSISDN" defaultValue="" readOnly />
        <input type="hidden" name="pp_RequestID" defaultValue="" readOnly />
        <input type="hidden" name="pp_ReturnURL" defaultValue="" readOnly />
        <input type="hidden" name="pp_SecureHash" defaultValue="" readOnly />
      </form>
    </div>
  );
}
