<template>
  <div class="q-pa-lg">
    <q-option-group
      v-model="group"
      :options="options"
      color="primary"
      inline
    />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      group: ref('WRK90MUL'),

      options: [
        {
          label: 'WRK90MUL',
          value: 'WRK90MUL'
        },
        {
          label: 'PTFJEXP',
          value: 'PTFJEXP'
        },
        {
          label: 'WRKJEXP',
          value: 'WRKJEXP'
        },
              {
          label: 'PTFSIAN',
          value: 'PTFSIAN'
        },
          {
          label: 'WRKSIAN',
          value: 'WRKSIAN'
        }
      ]
    }
  }
}
</script>
