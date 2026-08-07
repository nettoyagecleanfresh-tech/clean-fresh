import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendMailRaw } from "@/lib/mailer";

const ReviewRequestSchema = z.object({
  client_name: z.string(),
  client_email: z.string().email(),
  formule: z.string(),
  booking_date: z.string(),
});

export type ReviewRequestInput = z.infer<typeof ReviewRequestSchema>;

const GOOGLE_REVIEW_URL =
  "https://g.page/r/CaKxSyOiBkq8EBE/review";

export const sendReviewRequestServerFn = createServerFn({ method: "POST" })
  .validator((data: ReviewRequestInput) => ReviewRequestSchema.parse(data))
  .handler(async ({ data }) => {
    const siteUrl = process.env["VITE_SITE_URL"] ?? "https://www.cleanetfresh.fr";

    const formattedDate = (() => {
      try {
        const d = new Date(data.booking_date);
        return d.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      } catch {
        return data.booking_date;
      }
    })();

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Votre avis nous est précieux</title>
  <style>
    img{max-width:100%!important;height:auto!important}
    table{border-collapse:collapse}
    @media only screen and (max-width:620px){
      .container{width:100%!important}
      .px{padding-left:16px!important;padding-right:16px!important}
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#eef4f9;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#eef4f9;">
<tr><td align="center" style="padding:32px 12px;">
  <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #d7e3ee;border-radius:14px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;">

    <!-- Header -->
    <tr>
      <td style="background-color:#00b8ff;padding:22px 28px;border-bottom:3px solid #0093cc;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="60%" align="left" style="vertical-align:middle;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td bgcolor="#ffffff" style="border-radius:8px;padding:5px 10px;">
                    <img src="${siteUrl}/logo-email.png" width="110" alt="Clean&amp;Fresh" style="display:block;width:110px;height:auto;border:0;">
                  </td>
                </tr>
              </table>
            </td>
            <td width="40%" align="right" style="vertical-align:middle;">
              <table border="0" cellpadding="0" cellspacing="0" align="right">
                <tr>
                  <td bgcolor="#ffffff" style="border-radius:30px;padding:7px 15px;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.6px;color:#0093cc;white-space:nowrap;">⭐ VOTRE AVIS COMPTE</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Corps -->
    <tr>
      <td class="px" style="padding:36px 28px 8px 28px;">
        <h1 style="margin:0 0 12px 0;font-size:24px;font-weight:bold;color:#0f2c3f;">
          Bonjour ${data.client_name}, merci pour votre confiance ! 🙏
        </h1>
        <p style="margin:0 0 20px 0;font-size:15px;line-height:25px;color:#2f4d64;">
          Nous espérons que votre prestation <strong>${data.formule}</strong> du <strong>${formattedDate}</strong> vous a entièrement satisfait(e).<br><br>
          Votre satisfaction est notre priorité et votre retour d'expérience est précieux pour nous aider à nous améliorer et à aider d'autres clients à nous faire confiance.
        </p>
      </td>
    </tr>

    <!-- Étoiles décoratives -->
    <tr>
      <td class="px" style="padding:0 28px 20px 28px;">
        <div style="text-align:center;font-size:36px;letter-spacing:6px;">⭐⭐⭐⭐⭐</div>
      </td>
    </tr>

    <!-- CTA Avis -->
    <tr>
      <td class="px" style="padding:0 28px 0 28px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#fff8e1;border:1px solid #fde68a;border-radius:12px;">
          <tr>
            <td style="padding:24px 28px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#92400e;">Laissez-nous un avis Google</p>
              <p style="margin:0 0 20px 0;font-size:14px;line-height:22px;color:#78350f;">
                Cela ne prend que 2 minutes et aide énormément d'autres personnes à nous découvrir. Nous vous en remercions sincèrement !
              </p>
              <table border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td bgcolor="#fbbc04" style="border-radius:40px;box-shadow:0 3px 10px rgba(251,188,4,0.4);">
                    <a href="${GOOGLE_REVIEW_URL}" target="_blank" style="display:block;padding:16px 36px;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;color:#1a1a1a;text-decoration:none;">
                      ⭐ Laisser un avis sur Google
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Message de fermeture -->
    <tr>
      <td class="px" style="padding:24px 28px 0 28px;">
        <div style="padding:14px 18px;background-color:#f6faff;border-left:3px solid #00b8ff;border-radius:6px;font-size:14px;line-height:22px;color:#1e3f55;">
          Si vous avez eu la moindre remarque ou souhaitez nous signaler quoi que ce soit, n'hésitez pas à nous appeler directement au&nbsp;<a href="tel:0767127500" style="color:#0093cc;font-weight:bold;text-decoration:none;">07 67 12 75 00</a> ou à répondre à cet email. Nous traitons chaque retour avec la plus grande attention.
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#f6faff;padding:22px 28px;border-top:1px solid #dce7f2;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:21px;color:#12364d;margin-top:24px;">
        Merci encore pour votre confiance,<br>
        <strong style="color:#0093cc;">L'équipe Clean&amp;Fresh</strong><br>
        <span style="font-size:12px;color:#527a92;">Toulouse et Haute-Garonne</span><br>
        <span style="font-size:12px;"><a href="${siteUrl}" style="color:#0093cc;text-decoration:none;">cleanetfresh.fr</a></span>&nbsp;&nbsp;|&nbsp;&nbsp;<span style="font-size:12px;color:#527a92;"><a href="tel:0767127500" style="color:#527a92;text-decoration:none;">📞 07 67 12 75 00</a></span>
      </td>
    </tr>

  </table>
</td></tr>
</table>
</body>
</html>`;

    await sendMailRaw({
      to: data.client_email,
      subject: `⭐ ${data.client_name}, votre avis nous est précieux !`,
      html,
    });

    return { success: true };
  });
