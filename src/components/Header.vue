<script setup>
    import { ref } from 'vue'
    
    defineProps({
    })
    
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light mx-4 pt-3">
            <a class="navbar-brand d-flex" href="#">
                <img src="/images/ratatoskr.webp" width="60" height="60" class="d-inline-block align-top" alt="">
                <h1 class="ml-2">DAL Encore in ENG</h1>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<style>
nav h1 {
    font-size: 34px;
    font-weight: bold;
    line-height: 60px;
}

.nav-item a {
    text-align: right;
}

@media screen and (max-width: 550px) {
    nav h1 {
        display: none;
    }
}
</style>