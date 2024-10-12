<template>
    <div class="form">
        <FloatLabel class="form-item">
            <InputText class="form-input" v-model="baseUrl" />
            <label for="over_label">BASE_URL</label>
        </FloatLabel>
        <FloatLabel class="form-item">
            <InputText class="form-input" v-model="apiKey" />
            <label for="over_label">API_KEY</label>
        </FloatLabel>
        <FloatLabel class="form-item">
            <InputText class="form-input" v-model="model" />
            <label for="over_label">模型</label>
        </FloatLabel>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const baseUrl = ref(localStorage.getItem('baseUrl') || '')
const apiKey = ref(localStorage.getItem('apiKey') || '')
const model = ref(localStorage.getItem('model') || '')

watch(baseUrl, (newValue) => {
    localStorage.setItem('baseUrl', newValue)
})

watch(apiKey, (newValue) => {
    localStorage.setItem('apiKey', newValue)
})

watch(model, (newValue) => {
    localStorage.setItem('model', newValue)
})
</script>

<style>
.form {
    display: flex;
    flex-direction: column;
}

.form-item,
.form-input {
    width: 100%;
}

.form-item {
    margin: 20px 0;
}
</style>
