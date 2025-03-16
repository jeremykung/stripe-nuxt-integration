import { stripe } from '~/server/utils/stripe'
const baseUrl = useRuntimeConfig().public.BASE_URL as string

export default eventHandler(async event => {
    // receive body params
    // make stripe calls
        // custom price
        // create checkout
    
    console.log('creating checkout session with price')
        
    const body: { customer: string, course: string, price: number } = await readBody(event)
    console.log('req body:', body)

    try {
        // // Create Price
        // const price = await stripe.prices.create({
        //     currency: 'usd',
        //     unit_amount: body.price,
        //     product_data: {
        //         name: body.course,
        //     },
        // });
        // console.log('created price:', price)

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: body.price,
                        product: body.course,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${baseUrl}/success`,
            cancel_url: `${baseUrl}/cancelled`,
        });
        console.log('checkout session created:', session)

        if (session.url) {
            return { url: session.url }
        }
          
    } catch (error) {
        console.log('error creating checkout session:', error)
    }
})