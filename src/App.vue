<script setup>
import { ref } from 'vue'

const text = ref('Visual Reader')
</script>

<template>
    <Button>{{ text }}</Button>
</template>

<style>
body {
    margin: 0;
}
</style>
