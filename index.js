const express = require('express')
const app = express()

const TelegramBot = require('node-telegram-bot-api');
const { google } = require("googleapis");

const main = async () => {
    const token = '6352634011:AAH6mm6mTKL6-9rpwLBC_UeYMDtTvZTuXtY'; // Replace with your own bot token
    const bot = new TelegramBot(token, { polling: true });

    const auth = new google.auth.GoogleAuth({
        keyFile: "credential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1QPBvZ3UC0uXJ1EyaaOddEAeZ78-ROMVblfVA6OjwjNk";

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const messageText = msg.text;
    
        if (messageText === '/start') {
            bot.sendMessage(chatId, 'Hi! My name Kapu Bot');
        }
        if (messageText === '/dingu') {
            bot.sendMessage(chatId, 'ok bai bai ngủ đây');
        }
    });

    bot.onText(/\/muasam (.+)/, async (msg, match) => {
        const msgItems = match[1].split(',');
        const chatId = msg.chat.id;

        // Write row(s) to spreadsheet
        await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Chi tiêu!A:D",
                valueInputOption: "USER_ENTERED",
                resource: {
                values: [[new Date().toLocaleDateString('vi-VN'), "Mua Sắm", msgItems[1], msgItems[0]]],
            },
        });

        bot.sendMessage(chatId, "Oke nhe");
    });

    bot.onText(/\/nha (.+)/, async (msg, match) => {
        const msgItems = match[1].split(',');
        const chatId = msg.chat.id;

        // Write row(s) to spreadsheet
        await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Chi tiêu!A:D",
                valueInputOption: "USER_ENTERED",
                resource: {
                values: [[new Date().toLocaleDateString('vi-VN'), "Nhà", msgItems[1], msgItems[0]]],
            },
        });

        bot.sendMessage(chatId, "Oke nhe");
    });

    bot.onText(/\/xangxe (.+)/, async (msg, match) => {
        const msgItems = match[1].split(',');
        const chatId = msg.chat.id;

        // Write row(s) to spreadsheet
        await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Chi tiêu!A:D",
                valueInputOption: "USER_ENTERED",
                resource: {
                values: [[new Date().toLocaleDateString('vi-VN'), "Xăng xe", msgItems[1], msgItems[0]]],
            },
        });

        bot.sendMessage(chatId, "Oke nhe");
    });
}

main();

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)