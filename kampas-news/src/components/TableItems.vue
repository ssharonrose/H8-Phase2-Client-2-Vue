<script>

import Button from './Button.vue';

export default {
    name: "TableItems",
    emits: ["handleDeleteCategory", "idArticle", "handlePageChange", 'handleEditButton', 'updateStatusPost'],
    props: ["detailArticle", "currentPage", "ArrayCategory", "indexCategory", "dataLogs", "indexLogs", "indexArticle", "roleUser"],
    methods: {
        handleEditButton(id) {
            this.$emit("handleEditButton", id)
        },
        handleDeleteButton() {
            this.$emit("handleDeleteCategory")
        },
        updateStatus(id) {
            const newStatus = event.target.value;
            console.log(id, newStatus, "ini dari reusetabledata");
            this.$emit("updateStatusPost", id, newStatus);
        }
    },
    components: { Button },
    data() {
        return {
            EditButton: "Edit",
            DeleteButton: "Delete"
        }
    },

}
</script>
<template>
    <tr v-if="currentPage === 'ArticlePage'"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        v-for="(items, index) in  detailArticle " :key="items.id">
        <td class="w-32 p-4">{{ index + 1 }}
        </td>
        <td class="w-32 p-4">
            {{ items.title }}
        </td>
        <td class="w-32 p-4">
            <img :src="items.imgUrl">
        </td>
        <td class="w-32 p-4">
            {{ items.content }}
        </td>
        <td class="w-32 p-4">
            {{ items.User.email }}
        </td>
        <!-- <td class="w-32 p-4"> -->
        <td v-if="roleUser.toLowerCase() === 'admin'" class="w-32 p-4">
            <select name="status" @change="updateStatus(items.id)">
                <option value="Active" :selected="items.status === 'Active'">
                    Active
                </option>
                <option value="Inactive" :selected="items.status === 'Inactive'">
                    Inactive
                </option>
                <option value="Archived" :selected="items.status === 'Archived'">
                    Archived
                </option>
            </select>
        </td>
        <!-- </td> -->
        <td>
            <Button @click.prevent="handleEditButton(items.id)" :title="EditButton"
                style="padding-left: 10px;padding-right: 10px;margin-bottom: 5px;"
                class=" w-20 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-btn">
            </button>
        </td>
    </tr>
    <tr v-else-if="currentPage === 'CategoryPage'"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="w-32 p-4">{{ indexCategory + 1 }}
        </td>
        <td class="w-32 p-4">
            {{ ArrayCategory.name }}
        </td>
        <td>
            <Button @click.prevent="handleDeleteButton" :title="DeleteButton"
                style="padding-left: 10px; padding-right: 10px;"
                class=" w-20 p-2 bg-red-500 hover:bg-red-700 text-white font-bold  rounded-btn">
            </button>
        </td>
    </tr>
    <tr v-else-if="currentPage === 'LogPage'"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="w-32 p-4">{{ indexLogs + 1 }}
        </td>
        <td class="w-32 p-4">
            {{ dataLogs.name }}
        </td>
        <td class="w-32 p-4">
            {{ dataLogs.description }}
        </td>
        <td class="w-32 p-4">
            {{ dataLogs.createdAt }}
        </td>
        <td class="w-32 p-4">
            {{ dataLogs.updatedBy }}
        </td>
    </tr>
</template>

<style scoped></style>

