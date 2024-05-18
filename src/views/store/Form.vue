<template>
    <div class="container">
        <div class="row align-content-center vh-100 justify-content-center">
            <div class="col-5 align-self-center justify-content-center">
                <h2 class="text-center">我是店家</h2>
            </div>
            <div class="col-7">
                <v-form v-slot="{ errors }">
                    <h1>填寫店家資訊</h1>
                    <div class="mb-3">
                        <label for=" storeName" class="form-label"
                            >店家名稱</label
                        >
                        <v-field
                            id=" storeName"
                            type="email"
                            class="form-control"
                            aria-describedby="storeName"
                            name="店家名稱"
                            rules="required"
                            :class="{ 'is-invalid': errors['店家名稱'] }"
                        ></v-field>
                        <error-message
                            name="店家名稱"
                            class="text-danger"
                        ></error-message>
                    </div>
                    <div class="mb-3">
                        <p>店家地址</p>
                        <div class="row mb-3">
                            <div class="col-6">
                                <label for="InputCity" class="form-label"
                                    >縣市</label
                                >
                                <v-field
                                    id="InputCity"
                                    type="text"
                                    class="form-control"
                                    aria-describedby="City"
                                    name="縣市"
                                    rules="required"
                                    :class="{
                                        'is-invalid': errors['縣市'],
                                    }"
                                ></v-field>
                                <error-message
                                    name="縣市"
                                    class="text-danger"
                                ></error-message>
                            </div>
                            <div class="col-6">
                                <label for="InputArea" class="form-label"
                                    >區域</label
                                >
                                <v-field
                                    id="InputArea"
                                    type="text"
                                    class="form-control"
                                    aria-describedby="Area"
                                    name="區域"
                                    rules="required"
                                    :class="{
                                        'is-invalid': errors['區域'],
                                    }"
                                ></v-field>
                                <error-message
                                    name="區域"
                                    class="text-danger"
                                ></error-message>
                            </div>
                        </div>
                        <label for="InputAddress" class="form-label"
                            >地址</label
                        >
                        <v-field
                            id="InputAddress"
                            type="text"
                            class="form-control"
                            aria-describedby="Address"
                            name="地址"
                            rules="required"
                            :class="{
                                'is-invalid': errors['地址'],
                            }"
                        ></v-field>
                        <error-message
                            name="地址"
                            class="text-danger"
                        ></error-message>
                    </div>
                    <div class="mb-3">
                        <h3>店家介紹</h3>
                        <v-field
                            id="shopIntroduce"
                            as="textarea"
                            name="shopIntroduce"
                            cols="30"
                            rows="10"
                            rules="required"
                            :class="{
                                'is-invalid': errors['店家介紹'],
                            }"
                        ></v-field>
                        <error-message
                            name="店家介紹"
                            class="text-danger"
                        ></error-message>
                        <button type="submit" class="btn btn-primary">
                            完成基本資料
                        </button>
                    </div>
                </v-form>
            </div>
        </div>
    </div>
</template>
