<script>
export default {
    name: "DashboardPage",
    props: ["totalArticle", "totalCategory"],
    emits: ["readCategory", "readNews"],
    created() {
        this.$emit("readAllArticles");
        this.$emit("readAllCategories");
    },

}
</script>

<!-- <template>
    <div class="p-4 sm:ml-64">
        <div class="flex items-center justify-center h-48 mb-4 rounded">
            <h1 class="text-3xl font-semibold text-center text-white-700">WELCOME TO KAMPAS NEWS!</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-white p-4 shadow-md">
                    <h2 class="text-xl font-bold mb-8">Total Articles</h2>
                    <h3 class="text-xxl font-bold mb-4">{{ totalArticle }}</h3>
                </div>
                <div class="bg-white p-4 shadow-md">
                    <h2 class="text-xl font-bold mb-4">Total Categories</h2>
                    <h3 class="text-xxl font-bold mb-4">{{ totalCategory }}</h3>
                </div>
            </div>
        </div>
    </div>
</template> -->

<template>
    <div class="p-4 sm:ml-64">
        <div class="flex items-center justify-center h-48 mb-4 rounded">
            <h1 class="text-3xl font-semibold text-center text-white-700">WELCOME TO KAMPAS NEWS!</h1>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-4 shadow-md">
                <h2 class="text-xl font-bold mb-2">Total Articles</h2>
                <h3 class="text-2xl font-bold">{{ totalArticle }}</h3>
            </div>
            <div class="bg-white p-4 shadow-md">
                <h2 class="text-xl font-bold mb-2">Total Categories</h2>
                <h3 class="text-2xl font-bold">{{ totalCategory }}</h3>
            </div>
        </div>
    </div>
</template>
  

<style scoped></style>


