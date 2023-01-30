<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
const props = defineProps<{
    name: String,
    color?: String
}>()

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
    return 'svg-icon'
})
</script>

<style lang = "less" >
.svg-icon {
    width: .7rem;
    height: .7rem;
    fill: currentColor;
    overflow: hidden;
}
</style>