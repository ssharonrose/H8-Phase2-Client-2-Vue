<script>

import TableHeads from '../components/TableHeads.vue';
import TableItems from '../components/TableItems.vue';
import Button from '../components/Button.vue';

export default {
    name: "CategoryPage",
    components: { TableHeads, TableItems, Button },
    props: ["varCategoryList", "currentPage"],
    emits: ["CategoryListFromThePage", "handleDeleteCategory", "handleChangePage"],
    data() {
        return {
            tableColumn: ["#", "Name", ""],
            // tableRow: ["1", "Category Name", "Buat Button"],
            title: "Add Category"
        }
    },
    created() {
        this.$emit("CategoryListFromThePage")
    },
    methods: {
        handleAddCategoryButton(page) {
            this.$emit("handleChangePage", page)
        },
        handleDeleteButton(id) {
            this.$emit("handleDeleteCategory", id)
        }
    }
}
</script>


<template>
    <div class="flex justify-center p-4 sm:ml-64">
        <div class="text-xl font- bold my-8 border-b2 pb-2 rounded"
            style="padding-top: 80px;padding-bottom: 40px;width: 1000px;padding-left: 40px;padding-right: 40px;">
            <div class="flex justify-end mb-2">
                <Button @click.prevent="handleAddCategoryButton('AddCategoryPage')" :title="title"
                    style="padding-left: 10px; padding-right: 10px;"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-btn">
                </button>
            </div>
            <div class="shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <TableHeads :title="tableColumn" :currentPage="currentPage" />
                    </thead>
                    <tbody>
                        <TableItems v-for="(category, index) in varCategoryList" :key="category.id"
                            :ArrayCategory="category" :indexCategory="index"
                            @handleDeleteCategory="handleDeleteButton(category.id)" :currentPage="currentPage" />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped></style>