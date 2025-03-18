<template>
    <div>
      <div v-if="loading" class="checkout-loading">
        <p>Processing your payment...</p>
      </div>
      
      <div v-else-if="checkoutStatus === 'complete'" class="checkout-success">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        <p>Order ID: {{ sessionDetails.id }}</p>
        <!-- Additional order details -->
      </div>
      
      <div v-else-if="checkoutStatus === 'expired' || checkoutStatus === 'canceled'" class="checkout-failed">
        <h1>Payment Not Completed</h1>
        <p>Your checkout session has {{ checkoutStatus }}.</p>
        <NuxtLink to="/cart">Return to cart</NuxtLink>
      </div>
      
      <div v-else class="checkout-error">
        <h1>Something went wrong</h1>
        <p>We couldn't verify your payment status.</p>
        <NuxtLink to="/contact">Contact support</NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  const stripe = useStripe()
  const route = useRoute()
  const loading = ref(true)
  const checkoutStatus = ref(null)
  const sessionDetails = ref({})
  const error = ref(null)
  
  onMounted(async () => {
    try {
      const sessionId = route.query.session_id
      
      if (!sessionId) {
        error.value = 'No session ID provided'
        loading.value = false
        return
      }
      
      // Call your API endpoint to verify the session status
      
      const response = await stripe.verifySession(sessionId)
      console.log('verified session response:', response)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify payment')
      }
      
      sessionDetails.value = data.session
      checkoutStatus.value = data.session.status
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  })
  </script>