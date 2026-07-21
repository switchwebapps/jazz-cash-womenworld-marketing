export type DevopsLogFields = {
  msisdn: string;
  service?: string;
  subscribe_clicked?: "yes" | "no";
  form_submission?: "yes" | "no";
  event?: string;
  error?: string;
};

/** One-line DevOps frontend log. MSISDN is always included. */
export function devopsLog(fields: DevopsLogFields): void {
  const line = [
    `timestamp=${new Date().toISOString()}`,
    `msisdn=${fields.msisdn || "unknown"}`,
    `service=${fields.service || "Busuu"}`,
    `subscribe_clicked=${fields.subscribe_clicked ?? "no"}`,
    `form_submission=${fields.form_submission ?? "no"}`,
    `event=${fields.event || "info"}`,
    `error=${fields.error || "none"}`,
  ].join(" | ");

  console.log(`[DEVOPS] ${line}`);
}
