import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {stripe} from '../../services/stripe'

export default async (request:NextApiRequest, response:NextApiResponse) => {
  if(request.method === 'POST') {

  const session = await getSession({req: request})

    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,

    })

    const checkoutSessions = await stripe.checkout.sessions.create({
      customer:stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {price:'price_1IYvkpLU1q5D5NJbiGxHtyBD',quantity: 1}
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL

    })
    return response.status(200).json({session: checkoutSessions.id})
  }
  else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed')
  }
}
