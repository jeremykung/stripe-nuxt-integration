import { stripe } from '~/server/utils/stripe'

const runtimeConfig = useRuntimeConfig()

export default eventHandler(async event => {
    console.log("STRIPE Webhook Event:")
    const body = await readRawBody(event, false)
    console.log('body:', body)
    let stripeEvent: any = event
    console.log('stripe event body:', stripeEvent.body)

    const signature = getHeader(event, 'stripe-signature')
    console.log('signature:', signature)

    if (!body) {
        return { error: 'Invalid request body' }
    }

    if (!signature) {
        return { error: 'Invalid stripe-signature' }
    }

    console.log('STRIPE_WEBHOOK_SECRET:', runtimeConfig.STRIPE_WEBHOOK_SECRET)
    try {
        stripeEvent = stripe.webhooks.constructEvent(
            body,
            signature,
            runtimeConfig.STRIPE_WEBHOOK_SECRET
        )
        console.log('stripe event:', stripeEvent)
    } catch (err) {
        const error = createError({
            statusCode: 400,
            statusMessage: `Webhook error: ${err}`,
        })
        console.log('webhook error:', error)
        return sendError(event, error)
    }

    switch (stripeEvent.type) {
        case 'checkout.session.completed':
        console.log('Checkout Successful')
        break
        case 'charge.updated':
        console.log('Charge updated!')
        break
        default:
        console.log(`Unhandled event type ${stripeEvent.type}.`)
    }
    return { received: true, event: stripeEvent.type, message: "STRIPE Webhook Done" }
})