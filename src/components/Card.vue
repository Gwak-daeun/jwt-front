<template>
     
        <div class="card shadow-sm">
          <span class="img" :style="{backgroundImage: `url(${item.imgPath})`}" />
          <div class="card-body">
            <p class="card-text">
            <span> {{ item.name }}</span> &nbsp;
            <span class=" badge bg-danger"> {{ item.discountPer }}%</span> 
            </p>
            <div class="d-flex justify-content-between align-items-center">
             <button class="btn btn-primary" @click="addToCart(item.id)">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
             </button>
              <small class="price text-body-secondary">
                {{ lib.getNumberFormatted(item.price) }}원
              </small>
              <small class="discount">
              할인가  {{ lib.getNumberFormatted( item.price - (item.price *  (item.discountPer/100))) }}원 
              </small>
            </div>
          </div>
        </div>
</template>

<script>
// import { reactive } from 'vue';

import lib from '../scripts/lib.js';
import axios from 'axios';

    export default {
        name: 'Card',
        props: {
          item: Object
        },
        setup() {

          // const state = reactive({
            
          // });

          const addToCart = (itemId) => {
              axios.post(`/api/cart/items/${itemId}`).then((res) => {
                console.log("success: " , res);
              }).catch((err) => {

                console.log(err);
              })
          }

          return{ 
            lib,
            addToCart
          }
        }
    }
</script>

<style scoped>
.card .img{
  display: inline-block;
  width: 100%;
  height: 250px;
  background-size: cover ;
  background-position: center;
}

.card .card-body .price{
  text-decoration: line-through;
}
</style>