<template>
    <h1>Payment</h1>
    <div id="payment-element"></div>
    <div v-if="errorMessage" class="error-message">error:{{ errorMessage }}</div>
    <button @click="submitPayment()">Checkout</button>
    <NuxtLink v-if="checkoutUrl" :to="checkoutUrl"><button>Pay Now</button></NuxtLink>
</template>

<script lang="ts" setup>
// TESTING Composables for API call
// const server = useServer()
// const data = await server.sayHi()
// console.log('data:', data)

const stripe = useStripe()
const errorMessage = ref()
const checkoutUrl = ref()


async function submitPayment() {
    try {
        const checkout = await stripe.checkout("single_course")
        console.log("checkout:", checkout)
        checkoutUrl.value = checkout?.url
    } catch (error) {
        console.log("submit payment error:", error)
    }
}

// const YOUR_DOMAIN = "http://localhost:3000/"

// // Submit Payment
// async function submitPayment() {
//     console.log('submitting payment...')
//     console.log('stripe:', stripe)
//     try {
//         // Create Checkout Session
//         const session = await stripe.checkout.sessions.create({
//             line_items: [
//             {
//                 // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//                 price: "price_1R2HSVB37y9sx6qJu6KiU9Sy",
//                 quantity: 1,
//             },
//             ],
//             mode: 'payment',
//             success_url: `${YOUR_DOMAIN}/success.html`,
//             cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//             automatic_tax: {enabled: true},
//         });
//         console.log('checkout session:', session)
//     } catch (error) {
//         console.log('checkout session error:', error)
//     }
// }

onMounted(async () => {
    // try {
    //     elements = stripe!.elements({
    //         mode: "payment",
    //         amount: 2000,
    //         currency: "usd",
    //     })
        
    //     const paymentElement = elements.create("payment")
    //     paymentElement.mount("#payment-element")

    //     console.log('loaded')
    // } catch (error) {
    //     console.log('stripe loading error:', error)
    //     errorMessage.value = error!.message
    // }
})
</script>
