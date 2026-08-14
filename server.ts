import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_BOT_TOKEN = "7824394180:AAEh83yW29qboCM12oOj18-X2J8xDH0b6Kk";
const DEFAULT_CHAT_ID = "1851758530";

function parseBase64Image(dataUrl: string): { buffer: Buffer; mimeType: string; extension: string } | null {
  if (!dataUrl) return null;
  const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return null;
  }
  const mimeType = matches[1];
  const buffer = Buffer.from(matches[2], "base64");
  let extension = mimeType.split("/")[1] || "jpg";
  if (extension === "jpeg") extension = "jpg";
  return { buffer, mimeType, extension };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload size for base64 images
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Verification submission endpoint to send all user data + images to Telegram in one message
  app.post("/api/submit-verification", async (req, res) => {
    try {
      const {
        userId,
        telegramUsername,
        selectedGame,
        depositImage,
        idImage,
        timestamp,
      } = req.body;

      const botToken = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_CHAT_ID;

      const gameDisplayName =
        selectedGame === "apple"
          ? "🍎 Apple of Fortune (تفاحة الحظ)"
          : selectedGame === "mines"
          ? "💣 Gams Mines (الألغام)"
          : selectedGame || "VIP Script";

      const formattedTime =
        timestamp ||
        new Date().toLocaleString("ar-EG", {
          timeZone: "Africa/Cairo",
          dateStyle: "full",
          timeStyle: "medium",
        });

      // Build elegant HTML formatted caption
      const caption = `<b>🔔 طلب تفعيل سكربت جديد — MR DOLLAR VIP</b>
━━━━━━━━━━━━━━━━━━
👤 <b>ID المنصة:</b> <code>${userId || "غير محدد"}</code>
📱 <b>يوزر التلجرام:</b> ${telegramUsername ? `<b>${telegramUsername}</b>` : "غير محدد"}
🎮 <b>اللعبة المستهدفة:</b> ${gameDisplayName}
🎁 <b>البروموكود المستخدم:</b> <code>MELBG3</code>
⏰ <b>الوقت والتاريخ:</b> <code>${formattedTime}</code>
━━━━━━━━━━━━━━━━━━
📷 <b>المرفقات:</b>
1️⃣ صورة الإيداع: ${depositImage ? "✅ مرفقة" : "❌ غير مرفقة"}
2️⃣ صورة الـ ID والبروموكود: ${idImage ? "✅ مرفقة" : "❌ غير مرفقة"}
━━━━━━━━━━━━━━━━━━
⚡ <i>تم الإرسال تلقائياً من منظومة MR DOLLAR VIP</i>`;

      const depositParsed = depositImage ? parseBase64Image(depositImage) : null;
      const idParsed = idImage ? parseBase64Image(idImage) : null;

      let telegramResponse: any = null;

      // Case 1: Both images are provided -> Send as single Media Group album
      if (depositParsed && idParsed) {
        try {
          const formData = new FormData();
          formData.append("chat_id", chatId);

          const media = [
            {
              type: "photo",
              media: "attach://deposit_photo",
              caption: caption,
              parse_mode: "HTML",
            },
            {
              type: "photo",
              media: "attach://id_photo",
            },
          ];

          formData.append("media", JSON.stringify(media));
          formData.append(
            "deposit_photo",
            new Blob([depositParsed.buffer], { type: depositParsed.mimeType }),
            `deposit_proof.${depositParsed.extension}`
          );
          formData.append(
            "id_photo",
            new Blob([idParsed.buffer], { type: idParsed.mimeType }),
            `id_promo_proof.${idParsed.extension}`
          );

          const tgRes = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
            {
              method: "POST",
              body: formData,
            }
          );

          telegramResponse = await tgRes.json();
        } catch (mediaErr) {
          console.error("sendMediaGroup error, falling back:", mediaErr);
        }
      }

      // Case 2: Only 1 image is provided -> Send single photo with caption
      if (!telegramResponse?.ok && (depositParsed || idParsed)) {
        try {
          const targetPhoto = depositParsed || idParsed;
          if (targetPhoto) {
            const formData = new FormData();
            formData.append("chat_id", chatId);
            formData.append("caption", caption);
            formData.append("parse_mode", "HTML");
            formData.append(
              "photo",
              new Blob([targetPhoto.buffer], { type: targetPhoto.mimeType }),
              `verification.${targetPhoto.extension}`
            );

            const tgRes = await fetch(
              `https://api.telegram.org/bot${botToken}/sendPhoto`,
              {
                method: "POST",
                body: formData,
              }
            );

            telegramResponse = await tgRes.json();
          }
        } catch (singleErr) {
          console.error("sendPhoto error, falling back:", singleErr);
        }
      }

      // Case 3: Fallback or text-only message
      if (!telegramResponse?.ok) {
        const textRes = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: caption,
              parse_mode: "HTML",
            }),
          }
        );
        telegramResponse = await textRes.json();
      }

      if (!telegramResponse?.ok) {
        console.error("Telegram API error response:", telegramResponse);
      }

      return res.json({
        success: true,
        telegramSent: telegramResponse?.ok ?? false,
        message: "تم إرسال البيانات بنجاح",
      });
    } catch (error: any) {
      console.error("Error submitting verification:", error);
      return res.status(500).json({
        success: false,
        error: error?.message || "Internal server error",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MR DOLLAR server running on port ${PORT}`);
  });
}

startServer();
