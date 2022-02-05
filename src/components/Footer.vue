<template>
    <div class="container-fluid mt-auto border-top">
        <footer class="mt-auto d-flex flex-wrap justify-content-between align-items-center py-3 mt-4">
            <p class="col-md-4 mb-0 text-muted">© 2022 Partycipate, Inc</p>

            <ul class="nav col-md-4 justify-content-end">
                <li class="nav-item"><router-link :to="{ name: 'Index' }" class="nav-link px-2 text-muted">Home</router-link></li>
            </ul>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'Footer.vue'
}
</script>

<style scoped>
footer {
    background-color: #fafafa;
}
</style>
