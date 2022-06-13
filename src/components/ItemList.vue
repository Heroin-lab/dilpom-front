<template>
  <section class="products-list">
    <div class="container">

      <div class="flex-positioner">
<!--        <div class="side-bar">-->
<!--          <h1 class="side-bar__header">Список</h1>-->

<!--          <ul class="side-bar__list">-->
<!--            <li v-for="(offense, index) in offenses"-->
<!--                :key="index"-->
<!--            >-->
<!--              <OffenseCard-->
<!--                  :title_criminal="offense.title_criminal"-->
<!--              />-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->

        <div class="products" >
          <ItemEmptyList v-if="emptyBlockVis" id="empty-item"/>
          <ul class="item-list">
            <li v-for="(offense, index) in offenses"
                :key="index"
            >
              <OffenseCard
                  :id="offense.id"
                  :latitude="offense.latitude"
                  :longitude="offense.longitude"
                  :crime_code_id="offense.crime_code_id"
                  :title_criminal="offense.title_criminal"
                  :number_criminal="offense.number_criminal"
                  :user_id="offense.user_id"
                  :first_name="offense.first_name"
                  :second_name="offense.second_name"
                  :patronymic="offense.patronymic"
                  :phone_number="offense.phone_number"
                  :description="offense.description"
                  :time="offense.time"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import ItemEmptyList from "@/components/ItemEmptyList";
// import ItemCard from "@/components/ItemCard";
import OffenseCard from "@/components/OffenseCard"

export default {
  name: "ProductItem",
  components: {
    ItemEmptyList,
    // ItemCard,
    OffenseCard
  },
  data() {
    return {
      products: [],
      offenses: [],
      emptyBlockVis: true,
      sushiCategory: false,
      burgerCategory: false,
      pizzaCategory: false,
      dessertsCategory: false,
      frozenMealCategory: false,
      pastryCategory: false,
      mouseOverStatus: false,
    }
  },
  methods: {
    async getAllOffensesList () {
      await this.$store.dispatch('getAllUserOffensesByUserId', {userId: localStorage.getItem("user_id")})
      this.offenses = this.$store.getters.getAllOffenses
      if (this.offenses.length > 0) {
        this.emptyBlockVis = false
      }
    },

    async updateProductsByName (category) {
      await this.$store.dispatch('getProductsByCategory', {categoryName: category, products: []})
      this.products = this.$store.getters.getAllProducts
    },

    deleteProductsFromContainer(category) {
      this.$store.commit('DELETE_PRODUCT_FROM_CONTAINER', category)
      this.products = this.$store.getters.getAllProducts
    },

    addProductToBasket (id, prodInfo) {
      if (!localStorage.getItem("Basket")) {
        localStorage.setItem("Basket", JSON.stringify([prodInfo]))
        this.$emit("plusBasketCounter")
        return
      }

      let storage = JSON.parse(localStorage.getItem("Basket"))



      for (let i = 0; i < storage.length; i++) {
          if (storage[i].id == id) {
            storage[i].price = ((storage[i].price * 1) / (storage[i].quantity * 1))
            storage[i].quantity = (storage[i].quantity * 1) + 1
            storage[i].price *= storage[i].quantity
            localStorage.setItem("Basket", JSON.stringify(storage))
            return
          }
      }

      this.$emit("plusBasketCounter")
      storage.push(prodInfo)
      localStorage.setItem("Basket", JSON.stringify(storage))
    }
  },

  mounted() {
    this.getAllOffensesList()
  },

  watch: {
      // products() {
      //   let emptyBlock =  document.getElementById("empty-item")
      //   if (this.offenses.length == 0) {
      //     emptyBlock.style.display = "block"
      //   } else {
      //     emptyBlock.style.display = "none"
      //   }
      // },

      sushiCategory(newValue) {
        if (newValue === true) {
          this.updateProductsByName('sushi')
        } else {
          this.deleteProductsFromContainer('sushi')
        }
      },

      burgerCategory(newValue) {
        if (newValue === true) {
          this.updateProductsByName('burger')
        } else {
          this.deleteProductsFromContainer('burger')
        }
      },

      pizzaCategory(newValue) {
        if (newValue === true) {
          this.updateProductsByName('pizza')
        } else {
          this.deleteProductsFromContainer('pizza')
        }
      },

      dessertsCategory(newValue) {
        if (newValue === true) {
          this.updateProductsByName('dessert')
        } else {
          this.deleteProductsFromContainer('dessert')
        }
      },

      frozenMealCategory(newValue) {
        if (newValue === true) {
          this.updateProductsByName('frozen_meal')
        } else {
          this.deleteProductsFromContainer('frozen_meal')
        }
      },

      pastryCategory(newValue) {
        if (newValue === true) {
          this.updateProductsByName('pastry')
        } else {
          this.deleteProductsFromContainer('pastry')
        }
      },
    }


}
</script>

<style lang="scss" scoped>

  .products-list {
    min-height: calc(90vh - 44px);
  }

  .flex-positioner {
    display: flex;
  }

  .side-bar {
    display: flex;
    position: sticky;
    top: 10px;

    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 443px;
    border-radius: 7px;
    box-shadow: 2px 5px 10px rgb(143, 138, 138);

    &__header {
      display: block;
      margin: 0;
      padding: 15px 0 15px 0;
      width: 100%;
      text-align: center;
      border-radius: 7px 7px 0 0;
      box-shadow: 0px 2px 5px rgb(143, 138, 138);
      font-family: Gilroy;
    }

    &__list {
      margin: 0;
      padding: 0;
      list-style: none;

      & li {
        width: 300px;

        font-size: 21px;
        font-family: Gilroy;
        font-weight: 500;
        line-height: 3;
        letter-spacing: 1px;
        cursor: default;

        &:last-child {
          border-radius: 0 0 7px 7px;
        }

        &:not(:last-child) {
          border-bottom: 1px solid #b0b0b0;
        }

        &:hover {
          transition-duration: 0.5s;
          background-color: #ff004e;
          box-shadow: 0px 5px 10px rgb(143, 138, 138);
          border-bottom: 1px solid #ff004e;
        }
      }

      input[type=checkbox] {
        width:20px;
        height:20px;
        margin: 0 5px 0 15px;
        cursor: pointer;
      }
    }
  }

  .products {
    max-width: 1180px;
  }

  .item-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

</style>