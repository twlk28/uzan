<template lang="html">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="banner in lists">
                <a class="js-no-follow" v-bind:href="banner.clickURL">
                    <img class="goods-main-photo fadeIn" :src="banner.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        name: 'swipe',
        props: {
            lists: {
                type: Array,
                required: true,
            }
        },
        mounted(){
            new Swiper('.swiper-container', {
                loop: true,
                autoplay: {
                    delay: 5000,
                },
                pagination: {
                  el: '.swiper-pagination',
                },
            })
        }
    }
</script>

<style lang="css">
    .swiper-slide img{width: 100%; height: 100%;}
</style>
