<template>
      <form id="app-form" class="form">
          <div id="search" class="column" v-show='formControlElements.searchActive'>
              <div>
                  <input class="search-input" type="text" name="searchField" v-model="formContentValues.searchValue" v-bind:placeholder="formControlElements.placeholderSearch"/>
                  <button @click.prevent="onChangeSearch" class="search-button" type="button" name="button">{{formControlElements.searchButton}}</button>
              </div>

              <ul class="list seach-results">
                <li class="search-result" v-for="searchResult in searchResults">
                  <a href="#" @click.prevent="setPickedValue">{{ searchResult }}</a>
                </li>
              </ul>
          </div>

          <div id="details-sender" v-show='formControlElements.issuerDetailsActive'>
            <h2>{{formControlElements.issuerInfoLabel}}</h2>
            <div class="column">
              <label for="issuer-name">{{formControlElements.issuerNameLabel}}</label>
              <input ref="startpoint" type="text" name="issuer-name" v-bind:placeholder="formControlElements.issuerNamePlaceholder" v-model="formContentValues.issuerNameValue"  v-on:blur="hasContent">

              <label for="website">{{formControlElements.issuerWebsiteLabel}}</label>
              <input type="text" name="website" v-bind:placeholder="formControlElements.issuerWebsitePlaceholder" v-model="formContentValues.websiteValue"  v-on:blur="validateWebsite">
            </div>

            <label id="errorLabel" v-show ='formControlElements.formHasErrors' v-text="formContentValues.errors"></label>

            <div class="buttons">
              <button class="next-button" v-on:click.prevent="submitSearch">{{formControlElements.nextButton}}</button>
            </div>
          </div>


      <div id="personalize" v-show='formControlElements.customizeActive'>
        <h2>{{formControlElements.customizationLabel}}</h2>
        <div class="personalize-content-inputs">
          <div class="column" :class="{hiddenInput: formControlElements.imageInputActive}">
            <label for="company-logo">{{formControlElements.companyLogoLabel}}</label>

            <div class="logo-input">
              <input  type="file" @change="handleImage" id="image-input" name="company-logo" accept="image/png, image/jpeg, image/tiff, image/gif">
            </div>
          </div>

          <div class="column" :class="{hiddenInput: formControlElements.colorInput}">
            <label for="color">{{formControlElements.changeColorLabel}}</label>
            <input class ="color" type="color" name="color">
          </div>
        </div>

        <div class="buttons row space-between">
          <button class="save-to-library">{{formControlElements.saveLibraryLabel}}</button>
          <button class="save-and-award" v-on:click.prevent="submitSearch">{{formControlElements.saveAwardLabel}}</button>
        </div>
      </div>

      <div id="details-receiver" v-show='formControlElements.receiverDetailsActive'>
        <h2>{{formControlElements.receiverInfoLabel}}</h2>
        <div class="column">
          <label for="receivers-name">{{formControlElements.receiverNameLabel}}</label>
          <input ref="startpoint" type="text" name="issuer-name" v-bind:placeholder="formControlElements.issuerNamePlaceholder" v-model="formContentValues.receiverNameValue"  v-on:blur="hasContent">

          <label for="website">{{formControlElements.receiverEmailLabel}}</label>
          <input type="text" name="website" v-bind:placeholder="formControlElements.emailPlaceholder" v-model="formContentValues.emailValue"  v-on:blur="validateEmail">

          <label for="description">{{formControlElements.descriptionLabel}}</label>
          <textarea name="description" rows="8" cols="80" v-bind:placeholder="formControlElements.descriptionPlaceholder" v-model="formContentValues.descriptionValue"></textarea>
        </div>

        <label id="errorLabel" v-show ='formControlElements.formHasErrors' v-text="formContentValues.errors"></label>

        <div class="buttons">
          <button class="next-button" v-on:click.prevent="submitSearch">{{formControlElements.nextButton}}</button>
        </div>
      </div>

      <div id="overview" class="column" v-show='formControlElements.overviewActive'>
        <h2>Overview</h2>

        <div class="overview-inner">
          <div class="row sender-receiver-info">
            <div class="sender-info">
              <h3>sender</h3>
              <p>{{formContentValues.issuerNameValue}}</p>
              <p>{{formContentValues.websiteValue}}</p>
            </div>

            <div class="receiver-info">
              <h3>Receiver</h3>
              <p>{{formContentValues.receiverNameValue}}</p>
              <p>{{formContentValues.emailValue}}</p>
            </div>
          </div>

          <div class="description">
            <h3>Description</h3>
            <p>{{formContentValues.descriptionValue}}</p>
          </div>
        </div>
      </div>

    </form>
</template>

<style src="../css/app-form.css"></style>
<script src="../js/app-form.js"></script>
