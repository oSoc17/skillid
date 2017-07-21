<template>
  <div id="form">
    <form id="app-form" class="form">
      <h1 class="form-title">{{ currentTitle }}</h1>

      <nav id="navigation">
        <ol class="nav-list">
          <li v-bind:class="{actif: formControlElements.searchActive}">1. Search skill</li>
          <li v-bind:class="{actif: formControlElements.metaDataActive}">2. Meta data</li>
          <li v-bind:class="{actif: formControlElements.personalizeActive}">3. Personalize badge</li>
        </ol>
      </nav>

      <div class = "search-content" v-show='formControlElements.searchActive'>
        <label for="searchField">What are you looking for?</label>
        <div class="">
          <input class="searchField" type="text" name="searchField" v-model="searchValue"/>
          <button v-on:click="onChangeSearch" class="search-button" type="button" name="button">Search</button>
        </div>
  			<ol class="list">
          <li v-for="searchResult in searchResults">
            <a href="#" v-on:click="setPickedValue">{{ searchResult }}</a>
          </li>
        </ol>
      </div>

      <div class="meta-data-content" v-show='formControlElements.metaDataActive'>

        <div class="meta-data-form-particle">
          <h2>Your info</h2>

          <div class="meta-data-form-particle-input">
            <label for="issuer-name">Full name issuer</label>
      			<input type="text" name="issuer-name" v-model="issuerNameValue">

            <label for="website">Website url issuer</label>
      			<input type="text" name="website" v-model="websiteValue">
          </div>
        </div>

        <div class="meta-data-form-particle">
          <h2>Receivers info</h2>

          <div class="meta-data-form-particle-input">
            <label for="receiver-name">Full name receiver</label>
      			<input type="text" name="receiver-name" v-model="receiverNameValue">

      			<label for="e-mail">E-mail of the recipient</label>
      			<input type="email" name="e-mail" v-model="emailValue">
          </div>
        </div>

        <div class="meta-data-form-particle">
          <h2>Why</h2>

          <div class="meta-data-form-particle-input">
            <label for="description">Description why the recipient deserves the badge</label>
      			<textarea class="description" name="description" rows="4" cols="50" v-model="descriptionValue"></textarea>
          </div>

        </div>
        <label id="errorLabel" style="display: none">Didn't work</label>
      </div>

      <div id="personalize-content" v-show='formControlElements.personalizeActive'>
        <div class="personalize-content-labels">
          <label v-on:click.prevent="changeStateInputField('imageInputActive')" for="company-logo">Add company logo <br><img class="label-icon" src="../assets/svg/company.svg" alt="" ></label>
          <label v-on:click.prevent="changeStateInputField('companyNameInput')" for="company-name">Add company name <br> <img class="label-icon" src="../assets/svg/company-name.svg" alt="" ></label>
          <label v-on:click.prevent="changeStateInputField('urlInput')" for="url">Add url to company logo <br><img class="label-icon" src="../assets/svg/url.svg" alt="" ></label>
          <label v-on:click.prevent="changeStateInputField('colorInput')" for="color">Change color<br><img class="label-icon" src="../assets/svg/color.svg" alt="" ></label>
        </div>
        <div class="personalize-content-inputs">
          <div class="input-field" v-bind:class="{hiddenInput: formControlElements.imageInputActive}">
            <label for="company-logo">Company logo</label>
            <input  type="file" v-on:change="handleImage" id="image-input" name="company-logo" accept="image/png, image/jpeg, image/tiff, image/gif">
          </div>

          <div class="input-field" v-bind:class="{hiddenInput: formControlElements.companyNameInput}">
            <label for="company-name">Company name</label>
            <input type="text" name="company-name">
          </div>

          <div class="input-field" v-bind:class="{hiddenInput: formControlElements.urlInput}">
            <label for="url">Url</label>
            <input type="url" name="url">
          </div>

          <div class="input-field" v-bind:class="{hiddenInput: formControlElements.colorInput}">
            <label for="color">Color</label>
            <input type="text" name="color">
          </div>
        </div>
      </div>

      <div class="buttons">
        <button class="back-button" v-on:click.prevent="back"> &#x25C0 Back</button>
        <button v-on:click.prevent="submit">{{ currentButtonText }}</button>
      </div>
    </form>
  </div>
</template>

<style src="../css/app-form.css"></style>
<script src="../js/app-form.js"></script>
