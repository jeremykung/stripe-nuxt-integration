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
</template>

<script lang="ts" setup>
const stripe = useStripe()

const productName = ref<string>()
const customPrice = ref<number>()
const paymentUrl = ref<string>()

function createStripeProduct() {
    console.log('creating stripe product...')
    try {
        if (productName.value) {
            stripe.createProduct(productName.value)
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
            const checkout = await stripe.customCheckout("cus_RwcKlM17WJ7oOP", "prod_RxChzRHlApq7Wk", customPrice.value)
            if (checkout) {
                paymentUrl.value = checkout.url
                return checkout
            }
        }
    } catch (error) {
        console.log('error:', error)
    }
}
</script>
