<template>
  <div class="card">
    <div class="map">
      <iframe :src="this.longitude" width="400" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div class="desc">
      <h1 class="desc__header">{{ title_criminal }}</h1>
      <h2 class="desc__header">Стаття: {{ number_criminal }}</h2>
      <h3 class="desc__header">Правопорушник:</h3>
      <ul class="desc__header desc__list">
        <li>{{second_name}}</li>
        <li>{{first_name}}</li>
        <li>{{patronymic}}</li>
      </ul>
      <h3 class="desc__header">Час реєстрації правопорушення: {{time}}</h3>
      <h3 class="desc__header">Опис: {{description}}</h3>
    </div>
  </div>
</template>

<script>

export default {
  name: "OffenseCard",
  props: {
    id: Number,
    latitude: String,
    longitude: String,
    crime_code_id: Number,
    title_criminal: String,
    number_criminal: Number,
    user_id: Number,
    first_name: String,
    second_name: String,
    patronymic: String,
    phone_number: String,
    description: String,
    time: String,
  },

  data() {
    return {
      src1: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d97604.15241230597!2d",
      src2: "!3d",
      src3: "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1655159578292!5m2!1sru!2sua"
    }
  },

  methods: {

  },
}
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 20px 10px;
    background-color: white;
    border-radius: 7px;
    box-shadow: 0 4px 5px 2px rgba(0, 0, 0, 0.20);
  }

  .desc {

    &__header {
      width: 600px;
      margin: 20px 70px 0 70px;
    }

    &__list {
      font-size: 20px;
    }
  }
</style>