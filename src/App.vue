<script setup>
import { ref } from 'vue'

const items = ref(Array.from({ length: 1000000 }).map((_, i) => i));
</script>

<template>
    <VirtualScroller :items="items" :item-size="24" class="container">
        <template v-slot:item="{ item, options }">
            <div class="item">
                {{ options.index }} {{ item }}
            </div>
        </template>
    </VirtualScroller>
</template>

<style>
body {
    margin: 0;
}

.container {
    width: 100vw;
    height: calc(100vh - 60px);
}

.item {
    width: calc(100% - 24px);
    margin: 12px;
}
</style>
