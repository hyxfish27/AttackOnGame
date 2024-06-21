<script setup></script>

<template>
    <main class="container pt-4 bg-light">
        <div class="row gx-3">
            <div class="col-4">
                <div class="p-3 border rounded">Custom column padding</div>
            </div>
            <div class="col-8 p-3 border rounded">
                <div class="d-flex flex-column align-self-end">
                    <div>
                        <!-- tabli title -->
                        <div class="border-bottom py-2 mb-2">
                            <h7>活動管理</h7>
                        </div>
                        <!-- button group -->
                        <div class="d-flex">
                            <button
                                type="button"
                                class="btn btn-outline-primary"
                            >
                                即將到來
                            </button>

                            <button
                                type="button"
                                class="btn btn-outline-primary ms-2"
                            >
                                已完成
                            </button>

                            <button
                                type="button"
                                class="btn btn-outline-primary ms-2"
                            >
                                取消
                            </button>
                        </div>
                        <!-- table -->
                        <table class="table table-hover mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">活動名稱</th>
                                    <th scope="col">活動日期</th>
                                    <th scope="col">活動地點</th>
                                    <th scope="col">活動狀態</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>活動名稱</td>
                                    <td>活動日期</td>
                                    <td>活動地點</td>
                                    <td>活動狀態</td>
                                    <td>
                                        <div class="d-flex flex-column">
                                            <button
                                                type="button"
                                                class="btn btn-outline-primary mb-2"
                                            >
                                                編輯
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-outline-primary"
                                            >
                                                刪除
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-end">
                                <li class="page-item">
                                    <a class="page-link" href="#">Previous</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">2</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">3</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped></style>
