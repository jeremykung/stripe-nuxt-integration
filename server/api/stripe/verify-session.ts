import { stripe } from '~/server/utils/stripe'
const baseUrl = useRuntimeConfig().public.BASE_URL as string

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const sessionId = query.session_id as string

    console.log('verifying session...')
    console.log('query:', query)
    console.log('session_id:', query.session_id)
    
    if (!sessionId) {
        setResponseStatus(event, 400)
        return { error: 'Missing session_id parameter' }
    }
    
    try {
        
        // Retrieve the session to check its status
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        console.log('found session:', session)
        
        return {
            success: true,
            session: {
            id: session.id,
            status: session.status,
            customer_email: session.customer_email,
            payment_status: session.payment_status,
            // Include any other details you want to expose to the client
            }
        }
    } catch (error) {
        console.error('Error verifying Stripe session:', error)
        setResponseStatus(event, 500)
        return { 
            success: false,
            message: 'Failed to verify payment status'
        }
    }
  })