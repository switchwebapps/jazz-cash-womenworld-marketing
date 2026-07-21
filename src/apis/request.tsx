export type CheckSubscriberWwData = {
  success?: boolean;
  isExist?: boolean;
  isSubscriber?: boolean;
  msisdn?: string;
  message?: string;
};

/**
 * Checks subscriber via Women World API.
 * Proxied through /api/checkSubscriber because the upstream requires GET + JSON body,
 * which browsers cannot send.
 */
export async function checkSubscriberWw(mobileNumber: string) {
  try {
    const res = await fetch("/api/checkSubscriber", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msisdn: mobileNumber }),
    });
    const json = (await res.json()) as CheckSubscriberWwData;
    return { ok: res.ok, status: res.status, data: json };
  } catch (err: unknown) {
    return {
      ok: false,
      status: 0,
      data: null as CheckSubscriberWwData | null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

/** @deprecated Use checkSubscriberWw */
export async function checkmsisdnunified(mobileNumber: string) {
  return checkSubscriberWw(mobileNumber);
}

export async function checksubscribtion(mobileNumber: string) {
  return checkSubscriberWw(mobileNumber);
}
