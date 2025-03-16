<template>
    <h1>Create Product</h1>
    <button @click="createNewCourse('web dev', 'html css js', 10)">Create</button>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
import { loadStripe } from '@stripe/stripe-js';

let stripe: any

async function createNewCourse(courseName: string, courseDescription: string, initialPrice: number) {
    try {
        // 1. Create a new Product in Stripe for this specific course
        const product = await stripe.products.create({
            name: courseName,
            description: courseDescription,
            // You can add metadata to link to your internal IDs
            metadata: {
            teacher_id: 1,
            course_id: 3
            }
        });
        console.log('created product:', product)
        
        // 2. Create the initial Price for this Product
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: initialPrice * 100,
            currency: 'usd',
        });
        console.log('created product:', price)
        
        // 3. Store both IDs in your database
        return {
            stripeProductId: product.id,
            stripePriceId: price.id
        };

    } catch (error) {
        console.log('error:', error)
    }
}

onMounted(async () => {
    stripe = await loadStripe(config.public.STRIPE_PUBLIC_KEY);
})
</script>
