import { stripe } from '~/server/utils/stripe'

const baseUrl = useRuntimeConfig().public.BASE_URL as string

export default eventHandler(async event => {
    try {

        // Accept Custom Price for Checkout Event
        const body = await readBody(event)
        const session = await stripe.checkout.sessions.create({
            customer: "cus_RwcKlM17WJ7oOP",
            billing_address_collection: 'auto',
            line_items: [
            {
                price: "price_1R2jDKBFZPx2YGV3giFOqtF8",
                quantity: 1,
            },
            ],
            mode: 'payment',
            success_url: `${baseUrl}/success`,
            cancel_url: `${baseUrl}/cancelled`,
        })
    
        if (session.url) {
            return { url: session.url }
        }
    } catch (error) {
        console.log("create checkout error:", error)
    }
})