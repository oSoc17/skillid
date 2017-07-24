<template>
  <div id="form">
    <form id="app-form" class="form">
      <h1 class="form-title">{{ formContentElements.currentTitle }}</h1>
      <select v-model="locale" v-on:click.prevent="changeLanguage()">
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="nl">Netherland</option>
      </select>

      <nav id="navigation">
        <ol class="nav-list">
          <li v-bind:class="{actif: searchActive}">{{formContentElements.searchNavLabel}}</li>
          <li v-bind:class="{actif: metaDataActive}">{{formContentElements.metaDataNavLabel}}</li>
          <li v-bind:class="{actif: personalizeActive}">{{formContentElements.personalizeNavLabel}}</li>
        </ol>
      </nav>

      <div class = "search-content" v-show='searchActive'>
        <label for="searchField">{{formContentElements.searchFieldLabel}}</label>
        <div class="">
          <input class="searchField" type="text" name="searchField" v-model="formContentValues.searchValue" v-on:keyup="onChangeSearch">
          <button class="search-button" type="button" name="button">{{formContentElements.searchButton}}</button>
        </div>
  			<ol class="list">
          <li v-for="searchResult in searchResults">
            {{ searchResult }}
          </li>
        </ol>
      </div>

      <div class="meta-data-content" v-show='metaDataActive'>

        <div class="meta-data-form-particle">
          <h2>{{formContentElements.issuerInfoLabel}}</h2>

          <div class="meta-data-form-particle-input">
            <label for="issuer-name">{{formContentElements.issuerNameLabel}}</label>
      			<input type="text" name="issuer-name" v-model="formContentElements.issuerNameValue">

            <label for="website">{{formContentElements.websiteIssuerLabel}}</label>
      			<input type="text" name="website" v-model="formContentElements.websiteValue">
          </div>
        </div>

        <div class="meta-data-form-particle">
          <h2>{{formContentElements.receiverInfoLabel}}</h2>

          <div class="meta-data-form-particle-input">
            <label for="receiver-name">{{formContentElements.receiverNameLabel}}</label>
      			<input type="text" name="receiver-name" v-model="formContentElements.receiverNameValue">

      			<label for="e-mail">{{formContentElements.receiverEmailLabel}}</label>
      			<input type="email" name="e-mail" v-model="formContentElements.emailValue">
          </div>
        </div>

        <div class="meta-data-form-particle">
          <h2>{{formContentElements.whyLabel}}</h2>

          <div class="meta-data-form-particle-input">
            <label for="description">{{ formContentElements.descriptionLabel }}</label>
      			<textarea class="description" name="description" rows="4" cols="50" v-model="formContentValues.descriptionValue"></textarea>
          </div>

        </div>
        <label id="errorLabel" style="display: none">Didn't work</label>
      </div>

      <div id="personalize-content" v-show='personalizeActive'>
        <div class="personalize-content-labels">
          <label v-on:click.prevent="changeStateInputField('imageInputActive')" for="company-logo">{{formContentElements.companyLogoLabel}} <br><img class="label-icon" src="../assets/svg/company.svg" alt="" ></label>
          <label v-on:click.prevent="changeStateInputField('companyNameInput')" for="company-name">{{formContentElements.companyNameLabel}} <br> <img class="label-icon" src="../assets/svg/company-name.svg" alt="" ></label>
          <label v-on:click.prevent="changeStateInputField('urlInput')" for="url">{{formContentElements.companyUrlLabel}} <br><img class="label-icon" src="../assets/svg/url.svg" alt="" ></label>
          <label v-on:click.prevent="changeStateInputField('colorInput')" for="color">{{formContentElements.changeColorLabel}}<br><img class="label-icon" src="../assets/svg/color.svg" alt="" ></label>
        </div>
        <div class="personalize-content-inputs">
          <div class="input-field" v-bind:class="{hiddenInput: imageInputActive}">
            <label for="company-logo">{{formContentElements.logoLabel}}</label>
            <input  type="file" v-on:change="handleImage" id="image-input" name="company-logo" accept="image/png, image/jpeg, image/tiff, image/gif">
          </div>

          <div class="input-field" v-bind:class="{hiddenInput: companyNameInput}">
            <label for="company-name">{{formContentElements.nameLabel}}</label>
            <input type="text" name="company-name">
          </div>

          <div class="input-field" v-bind:class="{hiddenInput: urlInput}">
            <label for="url">{{formContentElements.urlLabel}}</label>
            <input type="url" name="url">
          </div>

          <div class="input-field" v-bind:class="{hiddenInput: colorInput}">
            <label for="color">{{formContentElements.colorLabel}}</label>
            <input type="text" name="color">
          </div>
        </div>
      </div>

      <div class="buttons">
        <button class="back-button" v-on:click.prevent="back"> {{formContentElements.backLabel}}</button>
        <button v-on:click.prevent="submit">{{formContentElements.currentButtonText }}</button>
      </div>
    </form>
  </div>
</template>

<style src="../css/app-form.css"></style>
<script src="../js/app-form.js"></script>