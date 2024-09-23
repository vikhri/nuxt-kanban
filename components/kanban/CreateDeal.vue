<script setup lang="ts">
import { v4 as uuid } from 'uuid'
// import { useForm } from '@vee-validate/nuxt'
import { COLLECTION_DEALS, DB_ID, COLLECTION_CUSTOMERS } from '~/app.constants'
import type { IDeal } from '~/types/deals.types'
import {useMutation} from "@tanstack/vue-query";

const isOpenForm = ref(false);

interface IDealFormState extends Pick<IDeal, 'name' | 'price'>  {
  customer: {
    email: string
    name: string
  }
  status: string
}

const props = defineProps({
  status: {
    type: String,
    default: 'todo',
  },
  refetch: {
    type: Function,
  },
})

console.log(props.status)

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
  initialValues: {
    status: props.status,
  },
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerEmail, customerEmailAttrs] = defineField('customer.email')
const [customerName, customerNameAttrs] = defineField('customer.name')

const { mutate, isPending } = useMutation({
  mutationKey: ['create a new deal and customer'],
  mutationFn: async (data: IDealFormState) => {
    try {
      // 1. Сначала создаем клиента в коллекции customers
      const customer = await DB.createDocument(DB_ID, COLLECTION_CUSTOMERS, uuid(), {
        email: data.customer.email,
        name: data.customer.name,
      })

      console.log(customer)

      // 2. Теперь создаем сделку, используя ID созданного клиента
      const deal = await DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), {
        name: data.name,
        price: data.price,
        customers: customer.$id, // Используем ID клиента для связи
        status: data.status,
      })

      return deal
    } catch (error) {
      throw new Error('Error creating deal or customer: ' + error.message)
    }
  },
  onSuccess() {
    props.refetch && props.refetch()
    handleReset()
  },
  onError(error) {
    console.error('Error creating document:', error);
  }
})

const onSubmit = handleSubmit(values => {
  mutate(values)
})
</script>

<template>
  <div class="text-center mb-2">
    <button
      class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8] w-10 h-10"
      @click="isOpenForm = !isOpenForm"
    >
      <Icon
        v-if="isOpenForm"
        name="radix-icons:arrow-up"
        size="35"
      />
      <Icon
        v-else
        name="radix-icons:plus-circled"
        size="35"
      />
    </button>
  </div>
  <form v-if="isOpenForm" @submit="onSubmit" class="form">
    <UiInput
      placeholder="Наименование"
      v-model="name"
      v-bind="nameAttrs"
      type="text"
      class="input"
    />
    <UiInput
      placeholder="Сумма"
      v-model="price"
      v-bind="priceAttrs"
      type="number"
      class="input"
    />
    <UiInput
      placeholder="Email"
      v-model="customerEmail"
      v-bind="customerEmailAttrs"
      type="text"
      class="input"
    />
    <UiInput
      placeholder="Компания"
      v-model="customerName"
      v-bind="customerNameAttrs"
      type="text"
      class="input"
    />

    <button class="btn" :disabled="isPending">
      {{ isPending ? 'Загрузка...' : 'Добавить' }}
    </button>
  </form>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}

.btn {
  @apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white;
}

.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }

  90% {
    @apply border-[#a252c83d];
  }

  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
