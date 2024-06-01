<template>
    <div class="home">
        <h1 class="text-success">Hello, This is Index Page.</h1>
        <RouterLink to="/">Index</RouterLink> |
        <hr />
        <HelloWorld />

        <br />

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <!-- Modal -->
        <div id="exampleModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 id="exampleModalLabel" class="modal-title fs-5">
                            Modal title
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Adipisci, consequatur.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import user from '@/stores/index';
// import PlayerAPI from '@/api/Player';
// import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';

// const router = useRouter();
// const theUserData = user();
// console.log(theUserData.userData);

const getPlayer = async (userId) => {
    await PlayerAPI.get(userId)
        .then((res) => {
            console.log(res);
        })
        .catch(() => {
            router.push({
                name: 'PlayerForm',
            });
        });
};
onMounted(() => {
    const { isLogin } = theUserData;
    if (isLogin) {
        const userId = theUserData.userData._id;
        getPlayer(userId);
    }
});
</script>

<style lang="scss" scoped></style>
