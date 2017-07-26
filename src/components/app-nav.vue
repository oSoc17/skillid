<template>
  <nav id="navigation" class="line row">
      <div v-bind:class="{'active-step': formControlElements.searchActive}" class="btn row">
        <li class="nav-item text">
          <span class="step-number">Step 1</span>
          <h2 class="step">Choose an endorsement</h2>
        </li>

        <div class="arrow"></div>
      </div>

      <div v-bind:class="{'active-step': formControlElements.issuerDetailsActive}" class="btn row">
        <li class="nav-item text">
          <span class="step-number">Step 2</span>
          <h2 class="step">Add your details</h2>
        </li>

        <div class="arrow"></div>

      </div>

      <div v-bind:class="{'active-step': formControlElements.customizeActive}" class="btn row">
        <li class="nav-item text">
          <span class="step-number">Step 3</span>
          <h2 class="step">Customize (optional)</h2>
        </li>

        <div class="arrow"></div>
      </div>

      <div v-bind:class="{'active-step': formControlElements.receiverDetailsActive}" class="btn row">
        <li class="nav-item text">
          <span class="step-number">Step 4</span>
          <h2 class="step">Award the badge</h2>
        </li>

        <div class="arrow"></div>
      </div>

      <div v-bind:class="{'active-step': formControlElements.overviewActive}" class="btn row">
        <li class="nav-item text">
          <span class="step-number">Step 5</span>
          <h2 class="step">Overview & share</h2>
        </li>
      </div>

  </nav>
</template>

<style src="../css/app-nav.css"></style>
<script src="../js/app.js"></script>
<script src="../js/app-nav.js"></script>
