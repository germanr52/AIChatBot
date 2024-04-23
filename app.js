const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require("@bot-whatsapp/bot");
require("dotenv").config();

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
// const JsonFileAdapter = require("@bot-whatsapp/database/json");
const MongoAdapter = require("@bot-whatsapp/database/mongo");

const flowPrincipal = addKeyword(["hola", "ole", "alo"]).addAnswer(
  "Bienvenido a AI ChatBot"
);

const flowWelcome = addKeyword(EVENTS.WELCOME).addAnswer(
  "Este es el flujo welcome",
  {
    delay: 100,
  },
  // media:
  //   "https://img.freepik.com/foto-gratis/hot-dog-ternera-parrilla-snack-ketchup-ia-generativa_188544-7829.jpg",
  async (ctx, ctxFn) => {
    // console.log(ctx.pushName, ctx.body, ctx.from);
    console.log(ctx);

    console.log("------------");

    ctxFn.flowDynamic(
      "Mi muy querid@ " +
        ctx.pushName +
        "(" +
        ctx.from +
        ") no pude entender tu mensaje " +
        ctx.body
    );
  }
);

const main = async () => {
  const adapterDB = new MongoAdapter({
    dbUri: process.env.MONGO_DB_URI,
    dbName: "AIChatBotTest",
  });
  const adapterFlow = createFlow([flowPrincipal, flowWelcome]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
