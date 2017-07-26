<template>
  <nav id="navigation" class="line row">
      <div v-bind:class="{'active-step': formControlElements.searchActive}" class="btn row">
        <li class="nav-item text">
          <span class="step-number">{{formControlElements.step1Label}}</span>
          <h2 class="step">{{formControlElements.stepEndorsement}}</h2>
        </li>

        <div class="arrow"></div>
      </div>

      <div v-bind:class="{'active-step': formControlElements.issuerDetailsActive}" class="btn row">
        <li class="nav-item text">
          <span class="step-number">{{formControlElements.step2Label}}</span>
          <h2 class="step">{{formControlElements.stepDetails}}</h2>
        </li>

        <div class="arrow"></div>

      </div>

      <div v-bind:class="{'active-step': formControlElements.customizeActive}" class="btn row">
        <li class="nav-item text">
          <span class="step-number">{{formControlElements.step3Label}}</span>
          <h2 class="step">{{formControlElements.stepCustomize}}</h2>
        </li>

        <div class="arrow"></div>
      </div>

      <div v-bind:class="{'active-step': formControlElements.receiverDetailsActive}" class="btn row">
        <li class="nav-item text">
          <span class="step-number">{{formControlElements.step4Label}}</span>
          <h2 class="step">{{formControlElements.stepAward}}</h2>
        </li>

        <div class="arrow"></div>
      </div>

      <div v-bind:class="{'active-step': formControlElements.overviewActive}" class="btn row">
        <li class="nav-item text">
          <span class="step-number">{{formControlElements.step5Label}}</span>
          <h2 class="step">{{formControlElements.stepOverview}}</h2>
        </li>
      </div>

  </nav>
</template>

<style src="../css/app-nav.css"></style>
<script src="../js/app.js"></script>
<script src="../js/app-nav.js"></script>
