<template>
  <section class="section">
    <div class="container">
      <controls />
      <game />
      <score />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  components: {
    'controls': require('@/components/Controls.vue').default,
    'game': require('@/components/Game.vue').default,
    'score': require('@/components/Score.vue').default
  }
}
</script>
