<template>
  <input
    ref="autocompleteInput"
    type="text"
    placeholder="Enter address..."
    v-model="search"
  />
</template>

<script>
import { ref, onMounted, watch } from 'vue';

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const autocompleteInput = ref(null);
    const search = ref(props.modelValue);

    onMounted(() => {
      if (typeof window.google === 'undefined') {
        console.error('Google Maps JavaScript API is not loaded');
        return;
      }

      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInput.value,
        {
          componentRestrictions: { country: 'NZ' },
        }
      );
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        emit('update:modelValue', place.formatted_address);
      });
    });

    watch(() => props.modelValue, (newValue) => {
      search.value = newValue;
    });

    return {
      autocompleteInput,
      search,
    };
  },
};
</script>