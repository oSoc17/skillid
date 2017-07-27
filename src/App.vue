<!-- fonts-->
<script src="https://use.fontawesome.com/a62e883b64.js"></script>
<template>
  <div id="container">
    <header class="column">
      <img class="logo" src="./assets/svg/logo.svg" width="90px" height="90px"/>
      <div class="row space-between">
        <div class="up-left-info column">
          <a href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i>{{formControlElements.returnLibraryLabel}}</a>
          <h1>{{formControlElements.createBadgeLabel}}</h1>
        </div>

        <div class="styled-select semi-square">
          <select v-model="formControlElements.locale" v-on:click.prevent="changeLanguage">
            <option value="en">English</option>
            <option value="nl">Dutch</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>

    </header>
    <main>
      <div class="content-container column">
        <app-nav v-bind:form-control-elements="formControlElements"></app-nav>

        <div class="row space-between">
          <app-form v-bind:form-control-elements="formControlElements" v-on:next-step="nextStep"></app-form>
          <app-badge v-bind:form-control-elements="formControlElements"></app-badge>
        </div>
      </div>
    </main>

  </div>
</template>

<script src="./js/app.js"></script>
<style src="./css/reset.css"></style>
<style src="./css/app.css"></style>