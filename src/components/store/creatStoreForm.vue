<template>
    <div class="">
        <v-form v-slot="{ errors }">
            <div class="mb-3">
                <label for=" storeName" class="form-label">店家名稱</label>
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
                        <label for="InputCity" class="form-label">縣市</label>
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
                        <label for="InputArea" class="form-label">區域</label>
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
                <label for="InputAddress" class="form-label">地址</label>
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
                <error-message name="地址" class="text-danger"></error-message>
            </div>
            <div class="mb-3 d-flex flex-column align-items-center p-0">
                <label for="shopIntroduce" class="form-label w-100"
                    >店家介紹

                    <v-field
                        id="shopIntroduce"
                        as="textarea"
                        name="shopIntroduce"
                        class="form-control w-100"
                        rules="required"
                        :class="{
                            'is-invalid': errors['店家介紹'],
                        }"
                    ></v-field>
                </label>
                <error-message
                    name="店家介紹"
                    class="text-danger"
                ></error-message>
                <button type="submit" class="btn btn-primary mt-2">
                    完成基本資料
                </button>
            </div>
        </v-form>
    </div>
</template>
