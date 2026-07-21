import { Bebas_Neue, Poppins } from "next/font/google";
import Image from "next/image";

const BRAND = {
  pink: "#C84C63",
  purple: "#6B2D85",
};

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const IconCycle = () => <Image src="/icon1.png" alt="" width={40} height={40} className="h-full w-full object-contain" />;
const IconInsights = () => <Image src="/icon2.png" alt="" width={40} height={40} className="h-full w-full object-contain" />;
const IconCommunity = () => <Image src="/icon3.png" alt="" width={40} height={40} className="h-full w-full object-contain" />;
const IconSos = () => <Image src="/icon4.png" alt="" width={40} height={40} className="h-full w-full object-contain" />;

const FEATURES = [
  { icon: IconCycle, label: "Cycle Tracking" },
  { icon: IconInsights, label: "Personalised Insights" },
  { icon: IconCommunity, label: "Supportive Communities" },
  { icon: IconSos, label: "SOS Assistance" },
];

const renderLogo = (mobile = false) => (
  <Image
    src="/womenworldlogo.webp"
    alt="Women World"
    width={140}
    height={140}
    className={mobile ? "h-auto w-[60px]" : "h-auto w-[100px] mt-8 mb-4"}
    priority
  />
);

const renderHeadline = (mobile = false) => (
  <div className={mobile ? "flex w-full flex-col items-center gap-1" : "flex flex-col gap-2"}>
    <span
      className={`relative z-10 block w-fit max-w-full ${bebasNeue.className} rounded-md text-center font-bold uppercase leading-tight text-white ${
        mobile ? "-rotate-3 px-4 py-2 text-[16px]" : "-rotate-2 px-8 py-1 text-[49px]"
      }`}
      style={{ backgroundColor: BRAND.pink }}
    >
      One App for Period Tracking
    </span>
    <span
      className={`relative z-0 block w-fit max-w-full ${bebasNeue.className} rounded-md text-center font-bold uppercase leading-tight text-white ${
        mobile ? "-mt-1 -rotate-1 px-4 py-2 text-[16px]" : "-mt-2.5 rotate-0 px-8 py-1 text-[54px]"
      }`}
      style={{ backgroundColor: BRAND.purple }}
    >
      Health, Safety &amp; Community
    </span>
  </div>
);

const renderFeatureGrid = (mobile = false) => (
  <div className={`grid grid-cols-2 ${mobile ? "mx-auto max-w-[300px] gap-2" : "w-full max-w-[490px] gap-4"}`}>
    {FEATURES.map(({ icon: Icon, label }) => (
      <div
        key={label}
        className={`flex items-center gap-3 rounded-2xl border border-[#e6e6ea] bg-white ${mobile ? "p-2" : "p-5"}`}
      >
        <span className={`shrink-0 ${mobile ? "h-5 w-5" : "h-9 w-9"}`}>
          <Icon />
        </span>
        <span className={`font-semibold leading-snug text-[#3D3D3D] ${mobile ? "text-[12px]" : "text-[16px]"}`}>
          {label}
        </span>
      </div>
    ))}
  </div>
);

const renderPhoneInput = (compact = false) => (
  <div
    className={`grid w-full grid-cols-[40px_1px_minmax(0,1fr)_auto] items-center rounded-2xl border border-[#e1e1e1] bg-white ${
      compact ? "h-[56px] px-4" : "h-[56px] px-5"
    }`}
  >
    <span className="flex items-center justify-start">
      <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.1078 16.7464L15.58 14.5246C15.3866 14.4302 15.1716 14.4103 14.9675 14.4679C14.7633 14.5255 14.581 14.6575 14.448 14.844L12.4429 17.649C9.29598 15.9502 6.76344 13.0505 5.27971 9.44732L7.72956 7.15146C7.89275 6.99949 8.00825 6.79078 8.05859 6.55692C8.10892 6.32307 8.09134 6.0768 8.0085 5.85541L6.06803 0.671212C5.97711 0.432558 5.81632 0.237704 5.61337 0.120251C5.41042 0.00279815 5.17804 -0.0298927 4.9563 0.0278157L0.751934 1.13872C0.538146 1.19524 0.347404 1.33307 0.210839 1.5297C0.0742738 1.72633 -4.9248e-05 1.97016 2.44832e-08 2.22138C2.44832e-08 14.0941 8.40468 23.6988 18.7579 23.6988C18.9774 23.6989 19.1904 23.6139 19.3623 23.4575C19.5341 23.3012 19.6545 23.0827 19.7039 22.8378L20.6741 18.0239C20.7242 17.7688 20.6951 17.5017 20.5917 17.2685C20.4883 17.0353 20.3172 16.8507 20.1078 16.7464Z"
          fill={BRAND.pink}
        />
      </svg>
    </span>
    <span className="h-7 w-px bg-[#e7e7e7]" />
    <span className="min-w-0 pl-4 text-[17px] font-light text-[#9a9aa0]">+92 XXXXXXXXX</span>
    <span className="flex items-center justify-end pl-3">
      <Image src="/jazzcashlogo.png" alt="JazzCash" width={92} height={30} className="h-auto w-[88px]" />
    </span>
  </div>
);

const renderSubscribeCard = (mobile = false) => (
  <div
    className={`w-full rounded-[12px] border border-[#C74B64] bg-[#F5F5F5] shadow-[0px_0px_18px_0px_#C74B64] ${
      mobile ? "mt-2 px-6 py-5" : "px-9 py-9"
    }`}
  >
    <h2 className={`font-semibold text-[#3D3D3D] ${mobile ? "text-[16px]" : "text-[19px]"}`}>
      Start Tracking Your Cycle Today
    </h2>
    <p className={`mt-1.5 text-[#898989] ${mobile ? "text-[10px]" : "text-[13px]"}`}>
      Enter your Jazz Cash number.
    </p>

    <div className="mt-5">{renderPhoneInput(mobile)}</div>

    <button
      className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg font-bold text-white opacity-80 ${
        mobile ? "h-[50px] text-[16px]" : "h-[58px] text-[18px]"
      }`}
      style={{ backgroundColor: BRAND.pink }}
      disabled
    >
      Subscribe
    </button>

    <div className={`mt-2 text-center text-[#3D3D3D] ${mobile ? "text-[13px]" : "text-[16px]"}`}>Rs 300/Month</div>

    <p className={`mt-2 text-center leading-relaxed text-[#272727] ${mobile ? "text-[10px]" : "text-[13px]"}`}>
      By proceeding you agree to{" "}
      <span className="font-semibold underline underline-offset-2">Terms &amp; Conditions</span>,{" "}
      <span className="font-semibold underline underline-offset-2">Privacy Policy</span> &amp; Auto-recursive payments
    </p>
  </div>
);

export default function JazzCashLanding() {
  return (
    <div className={`${poppins.className} relative flex min-h-dvh w-full overflow-hidden bg-white`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[18%] [clip-path:polygon(40%_0%,100%_0%,100%_100%,180%_100%)] sm:w-[13%] lg:w-[9%] lg:[clip-path:polygon(30%_0%,100%_0%,100%_100%,70%_100%)]"
        style={{ backgroundColor: BRAND.pink }}
      />

      <div className="relative z-10 hidden h-full w-full lg:flex">
        <div className="mx-auto flex h-full w-full max-w-[1180px] flex-col justify-center px-6 py-4">
          {renderLogo()}
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)_minmax(280px,420px)] items-center gap-8">
            <div className="flex flex-col gap-10">
              {renderHeadline()}
              {renderFeatureGrid()}
            </div>
            <div className="flex flex-col gap-6">{renderSubscribeCard()}</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center px-3 py-4 lg:hidden">
        <div className="flex w-full max-w-[420px] flex-col items-center gap-6">
          {renderLogo(true)}
          {renderHeadline(true)}
          <div className="w-full">{renderFeatureGrid(true)}</div>
          {renderSubscribeCard(true)}
        </div>
      </div>
    </div>
  );
}
