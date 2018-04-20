<template>
  <div>
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'default text'
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
