<template>
    <h1>Stripe x Nuxt</h1>
    <div class="create-product">
        <input v-model="productName" type="text" name="productName" id="productName" placeholder="Product Name">
        <button @click="createStripeProduct()">Create Product</button>
    </div>
    <div class="checkout">
        <input v-model="customPrice" type="text" name="customPrice" id="customPrice" placeholder="Course Price">
        <button @click="courseCheckout()">Checkout</button>
    </div>
    <div v-if="paymentUrl" class="payment">
        <NuxtLink :to="paymentUrl">Pay Now</NuxtLink>
        <!-- Make Embedded Stripe Element -->
    </div>
    <div id="checkout"></div>
</template>

<script lang="ts" setup>
import { loadStripe } from '@stripe/stripe-js';

useHead({
  script: [
    {
      src: 'https://js.stripe.com/v3/',
      async: true
    }
  ]
})
const stripeClient = await loadStripe(useRuntimeConfig().public.STRIPE_PUBLIC_KEY);
const stripeApi = useStripe()

const productName = ref<string>()
const customPrice = ref<number>()
const paymentUrl = ref<string>()
const clientSecret = ref<string>()

function createStripeProduct() {
    console.log('creating stripe product...')
    try {
        if (productName.value) {
            stripeApi.createProduct(productName.value)
        } else {
            throw new Error('Product name required.')
        }
    } catch (error) {
        console.log('error:', error)
    }
}

async function courseCheckout() {
    console.log('course checkout...')
    try {
        if (customPrice.value) {
            const checkout = await stripeApi.customCheckout("cus_RwcKlM17WJ7oOP", "prod_RxChzRHlApq7Wk", customPrice.value)
            if (checkout && "url" in checkout) {
                paymentUrl.value = checkout.url
                return checkout
            }
            if (checkout?.client_secret) {
                const embeddedCheckout = await stripeClient?.initEmbeddedCheckout({
                    clientSecret: checkout.client_secret
                })
                embeddedCheckout?.mount("#checkout")
                return checkout.client_secret
            } else {
                throw new Error("Checkout does not exist");
            }
        }
    } catch (error) {
        console.log('error:', error)
    }
}
</script>
