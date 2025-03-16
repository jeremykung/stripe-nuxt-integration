<template>
    <h1>Stripe x Nuxt</h1>
    <div class="create-product">
        <input v-model="productName" type="text" name="productName" id="productName" placeholder="Product Name">
        <button @click="createStripeProduct()">Create Product</button>
    </div>
</template>

<script lang="ts" setup>
const stripe = useStripe()

const productName = ref<string>()

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
</script>
