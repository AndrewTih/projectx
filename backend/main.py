from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from urllib.parse import parse_qs
import json

app = FastAPI()

class InitDataRequest(BaseModel):
    initData: str

class UserResponse(BaseModel):
    user_id: int
    username: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]

# Парсим initData, поддерживаем поле user (JSON)
def validate_telegram_init_data(init_data: str):
    data = parse_qs(init_data)
    user_json = data.get('user', [None])[0]
    if user_json:
        try:
            user = json.loads(user_json)
            return {
                'user_id': user.get('id'),
                'username': user.get('username', ''),
                'first_name': user.get('first_name', ''),
                'last_name': user.get('last_name', ''),
            }
        except Exception:
            pass
    # fallback на старый способ
    return {
        'user_id': int(data.get('user_id', [0])[0]),
        'username': data.get('username', [''])[0],
        'first_name': data.get('first_name', [''])[0],
        'last_name': data.get('last_name', [''])[0],
    }

@app.post('/user/me', response_model=UserResponse)
def get_user_me(data: InitDataRequest):
    user = validate_telegram_init_data(data.initData)
    if not user:
        raise HTTPException(status_code=401, detail='Invalid Telegram data')
    return user 