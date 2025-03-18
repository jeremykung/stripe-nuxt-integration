export function useStripe() {
    const checkout = async (lookupKey: string) => {
        console.log('making api call')
        const res = await $fetch('/api/stripe/create-checkout-session', {
            method: 'POST',
            body: {
            lookup_key: lookupKey,
            },
        })
    
        if (res) {
            return res
            // await navigateTo(res.url, {
            //   external: true,
            // })
        }
    }

    async function customCheckout(customer: string, course: string, price: number) {
        const response = await $fetch('/api/stripe/create-checkout-with-price', {
            method: "POST",
            body: {
                customer,
                course,
                price
            }
        })

        if (response) {
            console.log('create checkout res:', response)
            return response
        } else {
            console.log('NO CUSTOM CHECKOUT RES')
        }
    }

    async function createProduct(name: string) {
        console.log('creating stripe product...')
        try {
            const res = await $fetch('/api/stripe/create-product', {
                method: 'POST',
                body: {
                    name,
                },
            })
            if (res) {
                console.log('create product response:', res)
                return res
            }
        } catch (error) {
            console.log('api error:', error)
            return error
        }
    }

    async function verifySession(sessionId: string) {
        console.log('verifying session...')
        try {
            const response = await fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
            if (response) {
                console.log('verify session response:', response)
                return response
            }
        } catch (error) {
            console.log('verify sesion error:', error)
            return error
        }

    }
  
    const navigateToStripeDashboard = async () => {
      const res = await $fetch('/api/stripe/create-portal-session', {
        method: 'POST',
      })
  
      if (res && 'url' in res) {
        await navigateTo(res.url, {
          external: true,
        })
      } else {
        console.error('Error creating portal session:', res.error)
      }
    }
  
    const tiers = [
      {
        name: 'Freelancer',
        id: 'tier-freelancer',
        href: '#',
        price: '$24',
        description: 'The essentials to provide your best work for clients.',
        features: [
          '5 products',
          'Up to 1,000 subscribers',
          'Basic analytics',
          '48-hour support response time',
        ],
        mostPopular: false,
        type: 'monthly',
      },
      {
        name: 'Startup',
        id: 'tier-startup',
        href: '#',
        price: '$32',
        description: 'A plan that scales with your rapidly growing business.',
        features: [
          '25 products',
          'Up to 10,000 subscribers',
          'Advanced analytics',
          '24-hour support response time',
          'Marketing automations',
        ],
        mostPopular: true,
        type: 'monthly',
      },
      {
        name: 'Enterprise',
        id: 'tier-enterprise',
        href: '#',
        price: '$48',
        description: 'Dedicated support and infrastructure for your company.',
        features: [
          'Unlimited products',
          'Unlimited subscribers',
          'Advanced analytics',
          '1-hour, dedicated support response time',
          'Marketing automations',
        ],
        mostPopular: false,
        type: 'monthly',
      },
  
      {
        name: 'Freelancer',
        id: 'tier-freelancer-yearly',
        href: '#',
        price: '$240',
        description: 'The essentials to provide your best work for clients.',
        features: [
          '5 products',
          'Up to 1,000 subscribers',
          'Basic analytics',
          '48-hour support response time',
        ],
        mostPopular: false,
        type: 'yearly',
      },
      {
        name: 'Startup',
        id: 'tier-startup-yearly',
        href: '#',
        price: '$320',
        description: 'A plan that scales with your rapidly growing business.',
        features: [
          '25 products',
          'Up to 10,000 subscribers',
          'Advanced analytics',
          '24-hour support response time',
          'Marketing automations',
        ],
        mostPopular: true,
        type: 'yearly',
      },
      {
        name: 'Enterprise',
        id: 'tier-enterprise-yearly',
        href: '#',
        price: '$480',
        description: 'Dedicated support and infrastructure for your company.',
        features: [
          'Unlimited products',
          'Unlimited subscribers',
          'Advanced analytics',
          '1-hour, dedicated support response time',
          'Marketing automations',
        ],
        mostPopular: false,
        type: 'yearly',
      },
    ]
  
    return { checkout, customCheckout, createProduct, verifySession, navigateToStripeDashboard, tiers }
  }