<script>

import TableHeads from '../components/TableHeads.vue';
import TableItems from '../components/TableItems.vue';

export default {
    name: "LogPage",
    props: ["logsList", "currentPage"],
    emits: ["LogPage"],
    components: { TableHeads, TableItems },
    data() {
        return {
            tableColumn: ["#", "Article Title", "Description", "Created At", "Updated By"],
        }
    },
    created() {
        this.$emit("LogPage")
    }
}
</script>

<template>
    <div class="flex justify-center p-4 sm:ml-64">
        <div class="text-xl font- bold my-8 border-b2 pb-2 rounded"
            style="padding-top: 80px;padding-bottom: 40px;width: 1000px;padding-left: 40px;padding-right: 40px;">
            <div class="shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <TableHeads :title="tableColumn" :currentPage="currentPage" />
                    </thead>
                    <tbody>
                        <TableItems v-for="(data, index) in logsList" :dataLogs="data" :indexLogs="index"
                            :currentPage="currentPage" />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style></style>