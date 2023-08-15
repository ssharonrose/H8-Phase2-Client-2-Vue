<script>

import Button from '../components/Button.vue';

export default {
    name: "AddEditArticlePage",
    emits: ["AddArticle", "handleCancel", "EditArticle"],
    props: ["categoryList", "articleOne", "currentPage"],
    components: { Button },
    data() {
        return {
            data: {
                id: this.articleOne ? this.articleOne.id : "",
                title: this.articleOne ? this.articleOne.title : "",
                content: this.articleOne ? this.articleOne.content : "",
                imgUrl: this.articleOne ? this.articleOne.imgUrl : "",
                categoryId: this.articleOne ? this.articleOne.categoryId : "",
                buttonSubmit: "Submit",
                buttonCancel: "Cancel",
                buttonEditSubmit: 'Submit'
            },
            // data: {
            //     title: '',
            //     content: "",
            //     imgUrl: "",
            //     categoryId: "",
            //     buttonSubmit: "Submit",
            //     buttonCancel: "Cancel"
            // }
        }
    },
    methods: {
        handleAddArticle() {
            console.log(this.data.title, this.data.content, this.data.imgUrl, this.data.categoryId, "Ini ADD");
            this.$emit('AddArticle', this.data.title, this.data.content, this.data.imgUrl, this.data.categoryId,)
        },

        handleEditArticle() {
            console.log(this.data.title, this.data.content, this.data.imgUrl, this.data.categoryId, "Ini edit");
            // this.$emit('EditArticle', this.data.title, this.data.content, this.data.imgUrl, this.data.categoryId)
            this.$emit('EditArticle', this.data)
        },

        handleChangePage(page) {
            this.$emit("handleCancel", page);
        }
    },
    created() {
        // if (this.currentPage === 'editForm') {
        //     this.data.title = this.articleOne.title
        //     this.data.content = this.articleOne.content
        //     this.data.imgUrl = this.articleOne.content
        //     this.data.categoryId = this.articleOne.categoryId
        // } else {
        //     this.data.title = ""
        //     this.data.content = ''
        //     this.data.imgUrl = ''
        //     this.data.categoryId = ''
        // }
    }

}
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <!-- <h1 v-if="currentPage === 'editForm'"
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                        Add New Article
                    </h1> -->
                    <h1 v-if="this.currentPage === 'editForm'"
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                        Edit Article
                    </h1>
                    <h1 v-if="this.currentPage === 'AddEditArticlePage'"
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                        Add New Article
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" v-model="data.title"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder='' required>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                            <input type="text" v-model="data.content"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="" required="">
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image
                                Url</label>
                            <input type="text" v-model="data.imgUrl"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="" required="">
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select v-model="data.categoryId"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected disabled value="">Select Category</option>
                                <template v-for="category in categoryList" :key="category.id">
                                    <option :value="category.id" selected>
                                        {{ category.name }}</option>
                                </template>
                            </select>
                        </div>
                        <Button v-if="this.currentPage === 'editForm'" @click.prevent="handleEditArticle" type="submit"
                            :title="data.buttonEditSubmit"
                            class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            style="margin-right: 10px;">
                        </Button>
                        <Button v-if="this.currentPage === 'AddEditArticlePage'" @click.prevent="handleAddArticle"
                            type="submit" :title="data.buttonSubmit"
                            class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            style="margin-right: 10px;">
                        </Button>
                        <Button @click.prevent="handleChangePage('ArticlePage')" :title="data.buttonCancel"
                            class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>