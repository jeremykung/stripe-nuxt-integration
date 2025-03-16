// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY_TEST,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    public: {
      STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_TEST,
      BASE_URL: "http://localhost:3000"
    }
  }
})
