<template>
    <footer class="main-footer container-fluid">
        <div class="row">
            <div class="col-3">
                <h3>聚人</h3>
                <h6>Attack On Game</h6>
            </div>
            <div class="col-9"></div>
        </div>
    </footer>
</template>

<script>
/**
 * MainFooter
 * @author vicky
 * @description 全站共用 MainFooter
 */
export default {
    name: 'MainFooter',
};
</script>

<style lang="scss" scoped>
.main-footer {
    min-height: 100px;
    background-color: #180000;
    padding: 12px 0;
    position: fixed;
    bottom: 0;
    z-index: 1000;
}
</style>
