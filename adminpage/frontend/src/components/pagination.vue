<template>
    <div class="pagination">
        <div class="previous" @click="currentChange('previous')">Previous</div>
        <div class="next" @click="currentChange('next')">Next</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const { currentChange } = defineProps(['currentChange']);
</script>

<style lang="less" scoped>
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    color: black;

    .previous {
        background-color: rosybrown;
        margin-right: 10px;
        padding: 5px;
    }

    .next{
        padding: 5px;
        background-color: rosybrown;
    }
}
</style>