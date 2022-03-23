<template>
    <div class="container-fluid bg-gradient" style="height: 100vh">
        <div class="row">
            <div class="col-12 p-4">
                
                <img src="https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" class="img-fluid img-banner">
            </div>
            <div class="col-12 ps-4">
                <h1 class="text-light">The Knitting Factory</h1>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-3">
                        <div class="row">
                            <div class="col-12 text-light ps-4 pb-3">Budget: $4000</div>
                            <div class="col-12 text-light ps-4 pb-3">Capacity: 300</div>
                            <div class="col-12 text-light ps-4 pb-3">Boise, Idaho</div>
                            <div class="col-12 ps-4 pb-3">
                                <button class="btn btn-primary">Click Me</button>
                            </div>
                            <div class="col-12 ps-4 pb-3">
                                <button class="btn btn-primary">Placeholder</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-9"></div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>
.img-banner{
    height: 50vh;
    width: 100%;
    object-fit: cover;
}
</style>