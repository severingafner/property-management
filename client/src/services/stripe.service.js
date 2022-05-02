import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url

const updatePaymentMethod = (paymentMethodId, address) => {
  return axios.post(`${apiUrl}/v1/stripe/updatePaymentMethod`, {
    paymentMethodId: paymentMethodId,
    address: address
  }).then(response => {
    return response.data.user;
  });
}

const createSubscription = (subscriptionType) => {
  return axios.post(`${apiUrl}/v1/stripe/create-subscription`, {
    subscriptionType: subscriptionType
  }).then(response => {
    return response.data.subscription;
  });
}

const completeSubscription = (subscriptionId, productId) => {
  return axios.post(`${apiUrl}/v1/stripe/complete-subscription`, {
    subscriptionId: subscriptionId,
    productId: productId
  }).then(response => {
    return response.data.user;
  });
}

const deleteSubscription = (subscriptionId) => {
  return axios.post(`${apiUrl}/v1/stripe/delete-subscription`, {
    subscriptionId: subscriptionId
  }).catch(err => {});
}

export const stripeService = {
  updatePaymentMethod,
  createSubscription,
  completeSubscription,
  deleteSubscription,  
}