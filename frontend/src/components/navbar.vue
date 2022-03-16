<template lang="html">
    <div class="body">

        <div class="body-pd" id="body-pd">
            <header class="header" id="header">
                <div class="header__toggle">
                    <font-awesome-icon icon="fa-solid fa-bars" id="header-toggle"/>
                </div>

                <div class="header__img">
                    <img src="@/assets/logo.jpg" alt="">
                </div>
            </header>

            <div class="l-navbar" id="nav-bar">
                <nav class="nav">
                    <div>
                        <a href="#" class="nav__logo">
                            <img src="@/assets/logo.jpg" alt="logo" class="nav__logo-icon">
                            <span class="nav__logo-name">SNRKS</span>
                        </a>

                        <div class="nav__list">
                            <a href="/Inicio" class="nav__link">
                                <font-awesome-icon icon="fa-solid fa-house" class="nav__icon"/>
                                <span class="nav__name">Inicio</span>
                            </a>

                            <a href="/User" class="nav__link">
                                <font-awesome-icon icon="fa-solid fa-user" class="nav__icon"/>
                                <span class="nav__name">Perfil</span>
                            </a>
                            
                            <a href="/Oferta" class="nav__link">
                                <font-awesome-icon icon="fa-solid fa-dollar-sign" class="nav__icon"/>
                                <span class="nav__name">Oferta</span>
                            </a>

                            <a href="/Tracking" class="nav__link">
                                <font-awesome-icon icon="fa-solid fa-eye" class="nav__icon"/>
                                <span class="nav__name">Tracking</span>
                            </a>

                        </div>
                    </div>

                    <a href="#" class="nav__link" id="logout">
                        <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="nav__icon"/>
                        <span class="nav__name">Log Out</span>
                    </a>
                </nav>
            </div>

        </div>
    </div>
</template>

<script>
    import auth from "@/logic/auth"


    export default {
        mounted() {
            // Funcion para mostrar/ocultar el sidebar
            const toggle = document.getElementById("header-toggle")
            const nav = document.getElementById("nav-bar")
            const bodypd = document.getElementById("body-pd")
            const headerpd = document.getElementById("header")

            if(toggle && nav && bodypd && headerpd){
                toggle.addEventListener('click', ()=>{
                    // show navbar
                    nav.classList.toggle('show')
                    // change icon
                    toggle.classList.toggle('bx-x')
                    // add padding to body
                    bodypd.classList.toggle('body-pd')
                    // add padding to header
                    headerpd.classList.toggle('body-pd')
                })
            }

            // Seleccion de parte activa
            const linkColor = document.querySelectorAll('.nav__link')

            switch (this.$route.path) {
                case "/Inicio":
                    linkColor[0].classList.add('active')
                    break;
                case "/User":
                    linkColor[1].classList.add('active')
                    break;
                case "/Oferta":
                    linkColor[2].classList.add('active')
                    break;
                case "/Tracking":
                    linkColor[3].classList.add('active')
                    break;
            }

            // Funcion de logout
            const logout = document.getElementById('logout')
            logout.addEventListener('click', () => {
                auth.logOut()
                this.$router.push('/login')
            })
        },
    }

</script>

<style lang="css" scoped>
    
    .body{
        --header-height: 3rem;
        --nav-width: 68px;

        /*===== Colors =====*/
        --first-color: #F77F00;
        --first-color-light: #AFA5D9;
        --white-color: #F7F6FB;
        --text-color: #003049;

        /*===== Font and typography =====*/
        --body-font: 'Nunito', sans-serif;
        --normal-font-size: 1rem;

        /*===== z index =====*/
        --z-fixed: 100;
    }

        /*===== BASE =====*/
    .body-pd,::before,::after{
        box-sizing: border-box;
    }

    .body{
        position: relative;
        margin: var(--header-height) 0 0 0;
        padding: 0 1rem;
        font-family: var(--body-font);
        font-size: var(--normal-font-size);
        transition: .5s;
    }

    a{
        color: var(--text-color) !important;
        text-decoration: none !important;
    }

    /*===== HEADER =====*/
    .header{
        width: 100%;
        height: var(--header-height);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        background-color: var(--white-color);
        z-index: var(--z-fixed);
        transition: .5s;
    }

    .header__toggle{
        color: var(--first-color);
        font-size: 1.5rem;
        cursor: pointer;
        transition: .3s;
    }

    .header__img{
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
    }

    .header__img img{
        width: 40px;
    }

    /*===== NAV =====*/
    .l-navbar{
        position: fixed;
        top: 0;
        left: -30%;
        width: var(--nav-width);
        height: 100vh;
        background-color: var(--first-color);
        padding: .5rem 1rem 0 0;
        transition: .5s;
        z-index: var(--z-fixed);
    }

    .nav{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
    }

    .nav__logo, .nav__link{
        display: grid;
        grid-template-columns: max-content max-content;
        align-items: center;
        column-gap: 1rem;
        padding: .5rem 0 .5rem 1.5rem;
    }

    .nav__logo{
        margin-bottom: 2rem;
    }

    .nav__logo-icon{
        width: 25px;
        border-radius: 6px;
    }

    .nav__logo-name{
        color: var(--text-color);
        font-weight: 700;
    }

    .nav__link{
        position: relative;
        color: var(--text-color);
        margin-bottom: 1.5rem;
        transition: .3s;
    }

    .nav__link:hover{
        color: var(--white-color) !important;
    }

    .nav__icon{
        font-size: 1.25rem;
    }

    /*Show navbar movil*/
    .show{
        left: 0;
    }

    /*Add padding body movil*/
    .body-pd{
        padding-left: calc(var(--nav-width) + 1rem);
    }

    /*Active links*/
    .active{
        color: var(--white-color);
    }

    .active::before{
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 32px;
        background-color: var(--white-color);
    }

    .bx-x {
        transform: rotate(90deg);
        transition: .3s;
    }

    /* ===== MEDIA QUERIES=====*/
    @media screen and (min-width: 768px){
        .body{
            margin: calc(var(--header-height) + 1rem) 0 0 0;
            padding-left: calc(var(--nav-width) + 2rem);
        }

        .header{
            height: calc(var(--header-height) + 1rem);
            padding: 0 2rem 0 calc(var(--nav-width) + 2rem);
        }

        .header__img{
            width: 40px;
            height: 40px;
        }

        .header__img img{
            width: 45px;
        }

        .l-navbar{
            left: 0;
            padding: 1rem 1rem 0 0;
        }

        /*Show navbar desktop*/
        .show{
            width: calc(var(--nav-width) + 156px);
        }

        /*Add padding body desktop*/
        .body-pd{
            padding-left: calc(var(--nav-width) + 188px);
        }
    }

</style>