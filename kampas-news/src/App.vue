<script>
// ini di folder views

import RegisterPage from "./views/RegisterPage.vue"
import LoginPage from './views/LoginPage.vue';
import DashboardPage from './views/DashboardPage.vue';

// ini di folder components
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import axios from "axios"

import ArticlePage from "./views/ArticlePage.vue";
import AddEditArticlePage from "./views/AddEditArticlePage.vue";

import CategoryPage from "./views/CategoryPage.vue"
import AddCategoryPage from "./views/AddCategoryPage.vue";

import LogPage from "./views/LogPage.vue";

// const baseUrl = "http://localhost:3000"
const baseUrl = "https://kampas-news.sharonrose.dev"

export default {
  data() {
    return {
      articlesList: [],
      articleOne: [],
      categoriesList: [],
      logsList: [],
      username: "",
      roleUser: "",
      totalArticle: "",
      totalCategory: "",
      currentPage: "RegisterPage"
    }
  },
  components: { NavBar, SideBar, RegisterPage, LoginPage, DashboardPage, ArticlePage, CategoryPage, AddEditArticlePage, AddCategoryPage, LogPage },
  created() {
    if (localStorage.getItem("access_token")) {
      this.currentPage = "DashboardPage"
    } else {
      this.currentPage = "RegisterPage"
    }
  },
  methods: {
    async handleRegister(email, password, username, phoneNumber, address) {
      try {
        console.log(email, username, "dari app");

        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/register`,
          data: {
            username: username,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            address: address
          }
        })
        console.log(data, "ini dari app");
        this.currentPage = "LoginPage"
        console.log(this.currentPage);
      } catch (err) {
        console.log(err);
      }
    },

    async handleLogin(email, password) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/login`,
          data: {
            email: email,
            password: password,
          }
        })
        console.log(data);
        localStorage.setItem("access_token", data.access_token)

        localStorage.setItem("username", data.username)
        this.username = localStorage.getItem("username")

        localStorage.setItem("role", data.role)
        this.roleUser = localStorage.getItem("role")

        this.currentPage = "DashboardPage"
      } catch (err) {
        console.log(err);
      }
    },

    async handleGoogleLogin(response) {
      try {
        const google_token = response.credential
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/auth/google-sign-in`,
          data: {
            google_token: google_token,
          },
        })
        console.log(data);
        localStorage.setItem("access_token", data.access_token)
        this.currentPage = "DashboardPage"
      } catch (err) {
        console.log(err);
      }
    },


    // ------- ARTICLE PAGE -------- //

    async readAllArticles() {
      try {
        console.log("masuk read articles");
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/articles`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.articlesList = data
        this.totalArticle = data.message.length
        console.log(this.totalArticle);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },

    async addArticle(title, content, imgUrl, categoryId) {
      try {
        await this.readAllCategories()
        console.log(title, content, imgUrl, categoryId, "dari app");
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/articles`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            title: title,
            content: content,
            imgUrl: imgUrl,
            categoryId: categoryId,
          }
        })
        console.log(data, "ini dari app");
        this.currentPage = "ArticlePage"
        this.readAllArticles()
      } catch (err) {
        console.log(err);
      }
    },

    async readOneArticle(id) {
      try {
        console.log(id, 'readonetot')
        console.log("masuk read 1 articles");
        await this.readAllCategories()

        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/articles/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.articleOne = data.message
        this.currentPage = 'editForm'
        console.log('ini articleOne', data);
      } catch (err) {
        console.log(err);
      }
    },

    async editArticle(dataEdit) {
      // const { id, page } = props
      console.log(dataEdit, "ini di app bawa data ");

      // alert(id)
      try {
        // if (id) {
        // await this.readOneArticle(id)
        // this.currentPage = "editForm"
        // console.log(id, 'appvue')
        // await this.readAllCategories()
        // console.log("masuk read 1 articles", id);
        const { data } = await axios({
          method: "PUT",
          url: `${baseUrl}/articles/${dataEdit.id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: dataEdit
        })
        // console.log(data);
        this.currentPage = "ArticlePage"
        // this.handleChangePage(this.currentPage)
        // } else {
        //   this.currentPage = 'AddEditArticlePage'
        // }
        // await this.readAllCategories()
        // await this.addArticle(title, content, imgUrl, categoryId)
        // this.handleChangePage(page)
        // this.currentPage = "ArticlePage"
        // this.readAllArticles()
      } catch (err) {
        console.log(err);
      }
    },

    async updateStatusPost(id, page) {
      const status = page;
      console.log(status, 'disini appvue')
      try {
        const updateStatus = await axios({
          method: "PATCH",
          url: `${baseUrl}/articles/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            status: status,
          },
        });

        this.currentPage = "ArticlePage";

      } catch (err) {

      }
    },



    // ------- CATEGORY PAGE -------- //

    async readAllCategories() {
      try {
        console.log("masuk read category");
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/categories`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.categoriesList = data.message
        console.log('category list', data.message);
        this.totalCategory = data.message.length
        console.log(this.totalCategory);
      } catch (err) {
        console.log(err);
      }
    },

    async addCategory(name) {
      try {
        console.log(name, "dari app");

        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/categories`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            name: name,
          }
        })
        console.log(data, "ini dari app");
        this.currentPage = "CategoryPage"
        this.readAllCategories()
      } catch (err) {
        console.log(err);
      }
    },

    async deleteCategory(id) {
      console.log(id);
      try {
        console.log("masuk delete category");
        const { data } = await axios({
          method: "DELETE",
          url: `${baseUrl}/categories/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.readAllCategories()
      } catch (err) {
        console.log(err);
      }
    },

    // ------- LOGS PAGE -------- //

    async readAllLogs() {
      try {
        console.log("masuk read category");
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/histories`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.logsList = data.message
        console.log(data.message);
      } catch (err) {
        console.log(err);
      }
    },

    // --- FUNCTION HELPER ---- //

    handleChangePage(page) {
      try {
        this.currentPage = page
        this.readAllCategories()
        console.log(this.currentPage);

      } catch (error) {
        console.log(error);
      }
    },

    async handleLogout() {
      localStorage.clear()
      this.currentPage = "LoginPage"
    }

  }
}
</script>

<template>
  <NavBar />
  <SideBar v-if="currentPage !== 'RegisterPage' && currentPage !== 'LoginPage'" @handleRedirectPage="handleChangePage"
    :username="username" @handleLogout="handleLogout" />

  <section>
    <RegisterPage v-if="currentPage === 'RegisterPage'" @handleRegister="handleRegister"
      @handleRegisToLogin="handleChangePage" />

    <LoginPage v-else-if="currentPage === 'LoginPage'" @handleLogin="handleLogin" @handleLoginToRegis="handleChangePage"
      @handleGoogleLogin="handleGoogleLogin" />
  </section>
  <!-- Page Setelah Login -->

  <DashboardPage v-if="currentPage === 'DashboardPage'" :totalArticle="totalArticle" :totalCategory="totalCategory"
    @readAllArticles="readAllArticles" @readAllCategories="readAllCategories" />
  <ArticlePage v-else-if="currentPage === 'ArticlePage'" :varArticleList="articlesList"
    @ArticleListFromThePage="readAllArticles" v-bind:currentPage="currentPage" @handleChangePage="handleChangePage"
    @readOneArticle="readOneArticle" :username="username" @updateStatusPost="updateStatusPost" :roleUser="roleUser" />

  <AddEditArticlePage v-else-if="currentPage === 'AddEditArticlePage' || currentPage === 'editForm'"
    :categoryList="categoriesList" @AddArticle="addArticle" :articleOne="articleOne" @handleCancel="handleChangePage"
    @handleEditArticle="editArticle" @EditArticle="editArticle" :currentPage="currentPage" />



  <CategoryPage v-else-if="currentPage === 'CategoryPage'" :varCategoryList="categoriesList"
    @CategoryListFromThePage="readAllCategories" :currentPage="currentPage" @handleChangePage="handleChangePage"
    @handleDeleteCategory="deleteCategory" />
  <AddCategoryPage v-else-if="currentPage === 'AddCategoryPage'" @AddCategory="addCategory"
    @handleCancel="handleChangePage" :currentPage="currentPage" />

  <LogPage v-else-if="currentPage === 'LogPage'" @LogPage="readAllLogs" :logsList="logsList" :currentPage="currentPage" />
</template>

<style scoped></style>
