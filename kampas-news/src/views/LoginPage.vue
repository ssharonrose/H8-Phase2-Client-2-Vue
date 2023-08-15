<script>

import Button from '../components/Button.vue';
export default {
    name: "LoginPage",
    emits: ["handleLogin", "handleLoginToRegis", "handleGoogleLogin"],
    data() {
        return {
            email: "",
            password: "",
            title: "Sign In"
        };
    },
    methods: {
        handleLoginSubmit() {
            console.log(this.email, this.password, "ini loginPage");
            this.$emit("handleLogin", this.email, this.password);
        },
        handleChangPage(page) {
            this.$emit("handleLoginToRegis", page);
        },

        callback(response) {
            // This callback will be triggered when the user selects or login to
            // his Google account from the popup
            console.log("Handle the response", response)
            this.$emit("handleGoogleLogin", response)
        }


    },
    components: { Button }
}
</script>


<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Kampas-News
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="handleLoginSubmit">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" v-model="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="@mail.com" required="">
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" v-model="password" name="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <Button type="submit" :title="title"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"></Button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <a href="#" @click.prevent="handleChangPage('RegisterPage')"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                        <div class="flex items-center justify-center my-6 space-y-2 w-full">
                            <GoogleLogin :callback="callback" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style></style>