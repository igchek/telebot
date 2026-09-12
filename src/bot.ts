import { Bot } from "grammy";
import * as dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
if (!token) throw new Error("TELEGRAM_TOKEN отсутствует в .env");



const bot = new Bot(token);

bot.command("start", async (ctx) => {
  console.log("📥 Получена команда /start от пользователя");
  await ctx.reply("Привет! Всё работает 🚀");
});

bot.catch((err) => {
  console.error("Ошибка в работе бота:", err);
});

(async () => {
  try {
    await bot.api.setMyCommands([
      { command: "start", description: "Запустить бота" },
    ]);
    
    console.log("Запуск бота...");
    bot.start();
  } catch (err) {
    console.error("Ошибка при инициализации бота:", err);
  }
})();