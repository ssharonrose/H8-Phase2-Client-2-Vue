<script>

import TableHeads from '../components/TableHeads.vue';
import TableItems from '../components/TableItems.vue';
import Button from '../components/Button.vue';

export default {
    name: "ArticlePage",
    props: ["varArticleList", "currentPage", "roleUser"],
    emits: ["ArticleListFromThePage", "handleEditArticle", "handleChangePage", 'readOneArticle', "updateStatusPost"],
    components: { TableHeads, TableItems, Button },
    data() {
        return {
            tableColumn: ["#", "Article Title", "Image", "Description", "Author Email", "Status", ""],
            title: "Add Article"
        }
    },
    created() {
        this.$emit("ArticleListFromThePage")
    },
    methods: {
        handleAddArticleButton(page) {
            console.log(page, 'ini line 23')
            this.$emit("handleChangePage", page)
        },
        handleEditButton(id) {
            this.$emit('readOneArticle', id)
        },
        updateStatus(id) {
            const newStatus = event.target.value;
            console.log(id, newStatus, "ini dari reusetabledata articlepage");
            this.$emit("updateStatusPost", id, newStatus);
        },
    }
}
</script>

<template>
    <div class="flex justify-center p-4 sm:ml-64">
        <div class="text-xl font- bold my-8 border-b2 pb-2 rounded"
            style="padding-top: 80px;padding-bottom: 40px;width: 1000px;padding-left: 40px;padding-right: 40px;">
            <div class="flex justify-end mb-2">
                <Button @click.prevent="handleAddArticleButton('AddEditArticlePage')" :title="title"
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
                        <TableItems v-for="(article, index) in varArticleList" :detailArticle="article"
                            @handlePageChange="handleAddArticleButton" :indexArticle="index" :currentPage="currentPage"
                            :roleUser="roleUser" @handleEditButton="handleEditButton" @updateStatusPost="updateStatus">
                        </TableItems>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style></style>