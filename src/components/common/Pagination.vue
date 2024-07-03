<template>
    <ul class="pagination justify-content-end m-auto">
        <li class="page-item me-3" :class="{ disabled: currentPage === 1 }">
            <a
                class="page-link"
                href="#"
                aria-label="Previous"
                @click.prevent="prevPage"
            >
                <span aria-hidden="true">&lt;</span>
            </a>
        </li>
        <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
        >
            <a
                class="page-link rounded me-3 border-dark"
                href="#"
                @click.prevent="goToPage(page)"
                >{{ page }}</a
            >
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click.prevent="nextPage"
            >
                <span aria-hidden="true">&gt;</span>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
    },
    emits: ['update:currentPage'],
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.$emit('update:currentPage', this.currentPage - 1);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit('update:currentPage', this.currentPage + 1);
            }
        },
        goToPage(page) {
            if (page !== this.currentPage) {
                this.$emit('update:currentPage', page);
            }
        },
    },
};
</script>

<style scoped>
.page-item.disabled .page-link {
    pointer-events: none;
    opacity: 0.6;
}
.page-item.active .page-link {
    background-color: #0088cc;
    border-color: #0088cc;
    color: white;
}
</style>
