<template>
    <div>
            <q-card class="q-my-md">
      <q-card-section class="q-py-lg q-px-lg">
        <div class="q-pa-lg text-h6">
          <q-option-group
            v-model="group"
            @update:model-value="onGroupChange"
            :options="optionsGroup"
            color="primary"
            inline
          />
        </div>

        <div class="q-gutter-md row">
          <q-select
            filled
            v-model="model"
            use-input
            input-debounce="0"
            label="LIBDAT"
            clearable
            :options="options"
            @filter="filterFn"
            @update:model-value="onClickLibdat"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            filled
            v-model="fileNameModel"
            use-input
            input-debounce="0"
            label="FILE"
            autofocus
            clearable
            :options="fileNamesOptions"
            @filter="filterFileNames"
            @update:model-value="onClickFilename"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>

          <div class="q-ml-lg">
            <q-toggle
              v-model="queryToggle"
              size="xl"
              icon="visibility"
              label="Query first 10000 Records"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    </div>
</template>


<script setup>



</script>