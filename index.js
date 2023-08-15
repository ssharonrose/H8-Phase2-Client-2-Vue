const baseUrl = "http://localhost:3000"
// const baseUrl = "https://kampas-news.sharonrose.dev"
// const Swal = require('sweetalert2')
// console.log(Swal);

// let swal = $("swal").dats("swal")

//------------ FUNCTION GOOGLE ---------------//
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "891051034215-4aikq9mr0f94prpqosc0e1l07o6c95h5.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
}

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    $.ajax({
        method: "POST",
        url: `${baseUrl}/auth/google-sign-in`,
        // url: "http://localhost:3000/login",
        headers: {
            google_token: response.credential
        }
    })

        .done((result) => {

            // console.log(result);
            localStorage.setItem("access_token", result.access_token)
            localStorage.setItem("username", result.username)
            showHome()

            let username = localStorage.getItem("username")
            console.log(username);
            $("#username").html(username)
            
        })

        .fail((err) => {
            console.log(err);
            if (jqXHR) {
                localStorage.setItem("errors", jqXHR.responseJSON.message)
                errorSwal()
            }
        })
        .always(() => {
            console.log("yuhuuu");
        })
}
//------------ END FUNCTION GOOGLE ---------------//

//------------ DOCUMENT READY ---------------//

$(document).ready(function () {
    console.log("ready!");

    // ini pengkodisian, biar stlh login, udh nyimpen access token ke local storage, pas di home, lalu di refresh, engga balik login lagi
    // if (localStorage.getItem("access_token")) {
    //     let username = localStorage.getItem("username")
    //     $("#username").html(username)
    //     showHome()
    // } else {
    //     showRegisLogin()
    // }
    
    $("#nav-logout").click((event) => {
        localStorage.setItem("success", "Berhasil logout")
        successSwal()
        event.preventDefault()
        localStorage.clear()
        showRegisLogin()
    })

    $("#register-form").on("submit", function (event) {
        event.preventDefault()
        console.log("submit");
        const username = $("#register-username").val()
        const email = $("#register-email").val()
        const password = $("#register-password").val()
        const phoneNumber = $("#register-phone").val()
        const address = $("#register-address").val()

        $.ajax({
            method: "POST",
            url: `${baseUrl}/register`,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                username: username,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                address: address
            }
        })
            .done(function (response) {
                $("#register-form").trigger("reset")
                console.log(response);
                localStorage.setItem("success", "Berhasil register")
                successSwal()

            })
            .fail(function (jqXHR) {
                console.log(jqXHR.responseJSON.message);
                if (jqXHR) {
                    localStorage.setItem("errors", jqXHR.responseJSON.message)
                    errorSwal()
                }
            })
    })

    $("#login-form").on("submit", function (event) {
        event.preventDefault()
        console.log("submit");

        const email = $("#login-email").val()
        const password = $("#login-password").val()

        $.ajax({
            method: "POST",
            url: `${baseUrl}/login`,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                email: email,
                password: password,
            }
        })
            .done(function (response) {
                $("#login-form").trigger("reset")

                // kalo berhasil login dapet access token
                console.log(response.access_token, "ini akses token");

                localStorage.setItem("access_token", response.access_token)


                // buat munculin username
                localStorage.setItem("username", response.username)
                let username = localStorage.getItem("username")
                console.log(username);
                $("#username").html(username)

                localStorage.setItem("success", "Berhasil login")
                successSwal()
                showHome()

            })
            .fail(function (jqXHR) {
                console.log(jqXHR);
                console.log(jqXHR.responseJSON.message);
                if (jqXHR) {
                    localStorage.setItem("errors", jqXHR.responseJSON.message)
                    errorSwal()
                }
            })
    })

    //--- DISPLAY NAV BAR PRODUCT ---//
    $("#nav-product").on("click", function (event) {
        event.preventDefault()
        showProduct()
        getAllArticles()

    })

    $("#new-product").on("click", function (event) {
        event.preventDefault()
        showNewProduct()
        getAllCategories()

    })

    $("#product-form").on("submit", function (event) {
        event.preventDefault()
        console.log("submit");

        const title = $("#product-name").val()
        const categoryId = $("#product-category").val()
        const content = $("#product-desc").val()
        const imgUrl = $("#product-image").val()
        // const authorId = $()

        $.ajax({
            method: "POST",
            url: `${baseUrl}/articles`,
            headers: {
                access_token: localStorage.getItem("access_token")
            },
            data: {
                title: title,
                categoryId: categoryId,
                content: content,
                imgUrl: imgUrl
            }
        })
            .done(function (response) {
                $("#product-form").trigger("reset")
                localStorage.setItem("success", "Berhasil menambahkan article")
                successSwal()
                showProduct()
                getAllArticles()
                console.log(response);
            })
            .fail(function (jqXHR) {
                console.log(jqXHR);
                if (jqXHR) {
                    localStorage.setItem("errors", jqXHR.responseJSON.message)
                    errorSwal()
                }
            })
    })




    //--- DISPLAY NAV BAR CATEGORY ---//
    $("#nav-category").on("click", function (event) {
        event.preventDefault()
        showCategory()
        getAllCategories()
    })

    $("#new-category").on("click", function (event) {
        event.preventDefault()
        newCategory()
        getAllCategories()
    })

    $("#category-form").on("submit", function (event) {
        event.preventDefault()
        console.log("submit");

        const name = $("#category-name").val()

        $.ajax({
            method: "POST",
            url: `${baseUrl}/categories`,
            headers: {
                access_token: localStorage.getItem("access_token")
            },
            data: {
                name: name
            }
        })
            .done(function (response) {
                $("#category-form").trigger("reset")
                localStorage.setItem("success", "Berhasil menambahkan category")
                successSwal()
                showCategory()
                getAllCategories()
                console.log(response);
            })
            .fail(function (jqXHR) {
                console.log(jqXHR);
                if (jqXHR) {
                    localStorage.setItem("errors", jqXHR.responseJSON.message)
                    errorSwal()
                }
            })
    })

})

//------------ END DOCUMENT READY ---------------//

//------------ FUNCTION ARTICLES ---------------//
function getAllArticles() {
    $.ajax({
        method: "GET",
        url: `${baseUrl}/articles`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(function (response) {
            // console.log(response, "yooooooyuhgergfdg");
            let result = ""

            response.message.forEach((el, index) => {
                console.log(el);
                result += `
                <tr>
              <td scope="row">${index + 1}</td>
              <td class="fw-bold">${el.title}</td>
              <td>
                <img src="${el.imgUrl}"
                  class="img-fluid" />
              </td>
              <td>${el.content}</td>
              <td>${el.User.email}</td>
              <td onclick="deleteArticle(event,${el.id})">
                <a href="" class="ms-3"><span 
                class="icon material-symbols-outlined text-danger">delete</span></a>
              </td>
                <tr>`
            })

            $("#table-product").html(result)
        })
        .fail(function (jqXHR) {
            console.log(jqXHR);
        })
}

function deleteArticle(event, id) {
    event.preventDefault()
    console.log("function delete terpanggil");
    $.ajax({
        method: "DELETE",
        url: `${baseUrl}/articles/${id}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(function (response) {
            // console.log(response);
            localStorage.setItem("success", "Berhasil menghapus article")
            successSwal()
            showProduct()
            getAllArticles()
            console.log(response);
        })
        .fail(function (jqXHR) {
            console.log(jqXHR);
            if (jqXHR) {
                localStorage.setItem("errors", jqXHR.responseJSON.message)
                errorSwal()
            }
        })
}

function totalProduct() {
    $.ajax({
        method: "GET",
        url: `${baseUrl}/articles`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(function (response) {
            // console.log(response.message.length);
            let result = response.message.length
            $("#total-product").html(result)
            getAllArticles()
        })
        .fail(function (jqXHR) {
            console.log(jqXHR);
        })
}

//------------ FUNCTION CATEGORY ---------------//

function getAllCategories() {
    $.ajax({
        method: "GET",
        url: `${baseUrl}/categories`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(function (response) {
            // console.log(response, "bukan");
            let result = ""

            let hasil = ""

            response.message.forEach((el, index) => {
                result += `<option value="${el.id}">${el.name}</option>`

                hasil += `
                <tr>
              <td scope="row">${index + 1}</td>
              <td class="fw-bold">${el.name}</td>
              <td onclick="deleteCategory(event,${el.id})">
                <a href="" class="ms-3"><span class="icon material-symbols-outlined text-danger">delete</span></a>
              </td>
            </tr>
                `
            })

            $("#product-category").html(result)
            $("#table-category").html(hasil)
        })
        .fail(function (jqXHR) {
            console.log(jqXHR);
        })
}

function deleteCategory(event, id) {
    event.preventDefault()
    console.log("function delete category terpanggil");
    $.ajax({
        method: "DELETE",
        url: `${baseUrl}/categories/${id}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(function (response) {
            // console.log(response);
            localStorage.setItem("success", "Berhasil menghapus category")
            successSwal()
            showCategory()
            getAllCategories()
            console.log(response);
        })
        .fail(function (jqXHR) {
            console.log(jqXHR);
        })
}

function totalCategory() {
    $.ajax({
        method: "GET",
        url: `${baseUrl}/categories`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(function (response) {
            console.log(response.message.length);
            let result = response.message.length
            $("#total-category").html(result)
            getAllCategories()
        })
        .fail(function (jqXHR) {
            console.log(jqXHR);
        })
}

function errorSwal() {
    let errors = localStorage.getItem("errors")
    console.log(errors, "<<<<<<<");
    if (swal) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errors,
        })

    }

}

function successSwal() {
    let success = localStorage.getItem("success")
    console.log(success, "<<<<<<<");
    if (swal) {
        Swal.fire({
            icon: 'success',
            title: success,
        })

    }

}



//------ FUNCTION DISPLAY ------//

function showRegisLogin() {
    $("#login-section").show()
    $("#home-section").hide()
    $("#navbar").hide()
}


function showHome() {
    $("#login-section").hide()
    $("#home-section").show()
    $("#navbar").show()
    $("#dashboard-section").show()
    $("#product-section").hide()
    $("#new-product-section").hide()
    $("#category-section").hide()
    $("#new-category-section").hide()
    totalProduct()
    totalCategory()
}

function showProduct() {
    $("#login-section").hide()
    $("#home-section").show()
    $("#navbar").show()
    $("#dashboard-section").hide()
    $("#product-section").show()
    $("#new-product-section").hide()
    $("#category-section").hide()
    $("#new-category-section").hide()
}

function showNewProduct() {
    $("#login-section").hide()
    $("#home-section").show()
    $("#navbar").show()
    $("#dashboard-section").hide()
    $("#product-section").hide()
    $("#new-product-section").show()
    $("#category-section").hide()
    $("#new-category-section").hide()
}

function showCategory() {
    $("#login-section").hide()
    $("#home-section").show()
    $("#navbar").show()
    $("#dashboard-section").hide()
    $("#product-section").hide()
    $("#new-product-section").hide()
    $("#category-section").show()
    $("#new-category-section").hide()
}

function newCategory() {
    $("#login-section").hide()
    $("#home-section").show()
    $("#navbar").show()
    $("#dashboard-section").hide()
    $("#product-section").hide()
    $("#new-product-section").hide()
    $("#category-section").hide()
    $("#new-category-section").show()
}




