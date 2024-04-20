<template>
  <div>
    <h1>About</h1>
    <div class="about-card">
      <p class="about-card__header">About Card</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
};
</script>

<style lang="scss" scoped>
.about-card {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-top: 1rem;

  &__header {
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
