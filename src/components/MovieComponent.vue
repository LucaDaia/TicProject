<template>
  <div>
    <h1>{{ mTitle }}</h1>
    <h2>{{ mCategory }}</h2>
    <p>{{ mDescription }}</p>
    <p>{{ mCast }}</p>
    <p>{{ mDuration }}</p>
    <p>{{ mRating }}</p>
  </div>
</template>

<script>
export default {
  name: 'MovieComponent',
  props: {
    mTitle: String,
    mCategory: String,
    mDescription: String,
    mCast: String,
    mDuration: String,
    mRating: String
  },
  setup (props) {
    console.log(props.mTitle)
  }
}
</script>

<style>

</style>
