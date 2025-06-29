import os
from aiogram import Bot, Dispatcher, types
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import CommandStart
from aiogram.utils.keyboard import ReplyKeyboardBuilder
from aiogram import F
import asyncio
import httpx

BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '7835585032:AAH1aj6lSPCclpm1C4Wx-YS5jDkY9PYKKkA')
WEBAPP_URL = os.getenv('WEBAPP_URL', 'https://cadd-203-172-105-210.ngrok-free.app')
BACKEND_URL = os.getenv('BACKEND_URL', 'http://localhost:8000/user/me')

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def start(message: types.Message):
    # ReplyKeyboard с WebApp
    kb = ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="Открыть мини-апп", web_app=WebAppInfo(url=WEBAPP_URL))]
        ],
        resize_keyboard=True
    )
    # InlineKeyboard с WebApp
    inline_kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="Открыть мини-апп", web_app=WebAppInfo(url=WEBAPP_URL))]
        ]
    )
    # Формируем initData-подобную строку для backend (эмулируем WebApp)
    init_data = f"user_id={message.from_user.id}&first_name={message.from_user.first_name or ''}&last_name={message.from_user.last_name or ''}&username={message.from_user.username or ''}"
    payload = {"initData": init_data}
    name = None
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(BACKEND_URL, json=payload, timeout=5)
            if resp.status_code == 200:
                user = resp.json()
                name = f"{user.get('first_name', '')} {user.get('last_name', '')}".strip()
    except Exception:
        pass
    if name:
        await message.answer(f"Привет, {name}! Нажмите кнопку ниже, чтобы открыть мини-приложение.", reply_markup=kb)
    else:
        await message.answer("Добро пожаловать! Нажмите кнопку ниже, чтобы открыть мини-приложение.", reply_markup=kb)
    await message.answer(
        "Или воспользуйтесь кнопкой ниже:",
        reply_markup=inline_kb
    )

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main()) 