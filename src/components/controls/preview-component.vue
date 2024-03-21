<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          {{ $attrs["card-header"] }}
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-6" ref="wrap">
              <slot name="left"></slot>
            </div>
            <div class="col-6">
              <div class="callout callout-warning">
                <code>
                  <slot name="right"></slot>
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
