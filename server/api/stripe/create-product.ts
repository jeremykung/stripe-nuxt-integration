import { stripe } from '~/server/utils/stripe'

export default eventHandler(async event => {

    console.log('Stripe create product API call...')

    // Arguments are passed into the default event, and nitro can parse them using readBody()
    const body = await readBody(event)
    console.log('event body:', body)

    try {
        const product = await stripe.products.create({
            name: body.name,
        })
        console.log('product created:', product)
        return { 
            status: 200, 
            message: "Product Created Successfully",
            data: product
         }
    } catch (error) {
        console.log('stripe create product error:', error)
        return {
            status: 500,
            message: "Error creating product",
        }
    }
})