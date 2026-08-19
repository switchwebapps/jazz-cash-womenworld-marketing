export type DevopsLogFields = {
  msisdn: string;
  service?: string;
  campaign?: string;
  subscribe_clicked?: "yes" | "no";
  form_submission?: "yes" | "no";
  event?: string;
  error?: string;
  device_info?: string;
  user_ip?: string;
  journey_uuid?: string;
  landing_page_url?: string;
};

const normalizeLogValue = (value: string | undefined, fallback = "unknown") => {
  const sanitized = (value && value.trim() ? value.trim() : fallback)
    .replace(/\s*\|\s*/g, "/")
    .replace(/\s+/g, " ");

  return sanitized;
};

export function getDeviceInfo() {
  if (typeof navigator === "undefined") return "unknown";

  return navigator.userAgent || "unknown";
}

export function getJourneyUuid() {
  if (typeof window === "undefined") return "unknown";

  const storageKey = "ww_journey_uuid";

  try {
    let journeyUuid = sessionStorage.getItem(storageKey);

    if (!journeyUuid) {
      journeyUuid = `ww_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;
      sessionStorage.setItem(storageKey, journeyUuid);
    }

    return journeyUuid;
  } catch {
    return `ww_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;
  }
}

export function getLandingPageUrl(pageName: string) {
  return `https://jcmarketing.womenworld.com.pk/${pageName}`;
}

/** One-line DevOps frontend log. MSISDN is always included. */
export function devopsLog(fields: DevopsLogFields) {
  const line = [
    `timestamp=${new Date().toISOString()}`,
    `msisdn=${normalizeLogValue(fields.msisdn, "unknown")}`,
    `service=${normalizeLogValue(fields.service, "Busuu")}`,
    `campaign=${normalizeLogValue(fields.campaign, "unknown")}`,
    `subscribe_clicked=${normalizeLogValue(fields.subscribe_clicked, "no")}`,
    `form_submission=${normalizeLogValue(fields.form_submission, "no")}`,
    `event=${normalizeLogValue(fields.event, "info")}`,
    `error=${normalizeLogValue(fields.error, "none")}`,
    `device_info=${normalizeLogValue(fields.device_info, "unknown")}`,
    `user_ip=${normalizeLogValue(fields.user_ip, "unknown")}`,
    `journey_uuid=${normalizeLogValue(fields.journey_uuid, "unknown")}`,
    `landing_page_url=${normalizeLogValue(fields.landing_page_url, "unknown")}`,
  ].join(" | ");

  return `[FRONTEND LOGS] ${line}`;
}
