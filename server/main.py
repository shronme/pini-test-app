import json
import stripe
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

stripe.api_key = 'sk_test_51I2dtwKYFcH0CnWCQsSvMMbqlJ8suRzPyRNIJLNTjYeBv2AT6eIdyg332EQO84abvHDQwabSr089WG0WEQeMePST002iF6lgWi'


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Payment(BaseModel):
    amount: int
    currency: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/create-payment")
async def create_payment(payment: Payment):
    customer = stripe.Customer.create()
    intent_setup = stripe.PaymentIntent.create(
        customer=customer.id,
        payment_method_types=["card"],
        setup_future_usage='off_session',
        currency=payment.currency,
        amount=payment.amount
    )

    return intent_setup