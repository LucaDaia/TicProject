<template>
  <div class="movie-details">
    <h2>{{ mTitle }}</h2>
    <div class="details">
      <div class="detail">
        <span class="label">Category:</span>
        <span>{{ mCategory }}</span>
      </div>
      <div class="detail">
        <span class="label">Cast:</span>
        <span class="spanValue">{{ mCast }}</span>
        <span class="label">Duration:</span>
        <span class="spanValue">{{ mDuration }} minutes</span>
        <span class="label">Rating:</span>
        <span class="spanValue">{{ mRating }}/10</span>
      </div>
        <div class="detail">
        <span class="label">Description:</span>
        <p>{{ mDescription }}</p>
      </div>
    </div>
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

<style scoped>
.movie-details {
  background-color: rgb(241, 182, 95);
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 5px;
}

.details {
  margin-top: 10px;
  font-size: 10px;
}

.detail {
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  padding-left: 20px;
}

</style>
