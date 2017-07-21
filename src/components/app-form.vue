<template>
  <div id="form">
      <form id="app-form" class="form">
          <h1 class="form-title">{{ formContentElements.currentTitle }}</h1>

          <nav id="navigation">
              <ol class="nav-list">
                  <li :class="{active: formControlElements.searchActive}">1. Search skill</li>
                  <li :class="{active: formControlElements.metaDataActive}">2. Metadata</li>
                  <li :class="{active: formControlElements.personalizeActive}">3. Personalize badge</li>
              </ol>
          </nav>

          <div class = "search-content" v-show='formControlElements.searchActive'>
              <label for="searchField">What are you looking for?</label>
              <div>
                  <input class="searchField" type="text" name="searchField" v-model="formContentValues.searchValue"/>
                  <button @click="onChangeSearch" class="search-button" type="button" name="button">Search</button>
              </div>
                  <ol class="list">
                  <li v-for="searchResult in searchResults">
                      <a href="#" @click="setPickedValue">{{ searchResult }}</a>
                  </li>
              </ol>
          </div>

          <div class="meta-data-content" v-show='formControlElements.metaDataActive'>

              <div class="meta-data-form-particle">
                  <h2>Your info</h2>
                  <div class="meta-data-form-particle-input">
                      <label for="issuer-name">Name issuer</label>
                      <input type="text" name="issuer-name" placeholder="Issuers name" v-model="formContentValues.issuerNameValue">

                      <label for="website">Website issuer</label>
                      <input type="text" name="website" placeholder="www.example.com" v-model="formContentValues.websiteValue">
                  </div>
              </div>

              <div class="meta-data-form-particle">
                  <h2>Receivers info</h2>

                  <div class="meta-data-form-particle-input">
                      <label for="receiver-name">Name receiver</label>
                      <input type="text" name="receiver-name" placeholder="Receivers name" v-model="formContentValues.receiverNameValue" v-on:leave="leaveReceiverName">

                      <label for="e-mail">E-mail receiver</label>
                      <input type="email" name="e-mail" placeholder="example@gmail.com" v-model="formContentValues.emailValue">
                  </div>
              </div>
              <div class="meta-data-form-particle">
                  <h2>Why</h2>

                  <div class="meta-data-form-particle-input">
                      <label for="description">Description why the receiver deserves the badge</label>
                      <textarea placeholder="Got it for feeding cats" class="description" name="description" rows="4" cols="50" v-model="formContentValues.descriptionValue"></textarea>
                  </div>
              </div>
              <label id="errorLabel" v-show ='formControlElements.formHasErrors' >Didn't work</label>
          </div>

      <div id="personalize-content" v-show='formControlElements.personalizeActive'>
        <div class="personalize-content-labels">
          <label @click.prevent="changeStateInputField('imageInputActive')" for="company-logo">Add company logo <br><img class="label-icon" src="../assets/svg/company.svg" alt="" ></label>
          <label @click.prevent="changeStateInputField('companyNameInput')" for="company-name">Add company name <br> <img class="label-icon" src="../assets/svg/company-name.svg" alt="" ></label>
          <label @click.prevent="changeStateInputField('urlInput')" for="url">Add url to company logo <br><img class="label-icon" src="../assets/svg/url.svg" alt="" ></label>
          <label @click.prevent="changeStateInputField('colorInput')" for="color">Change color<br><img class="label-icon" src="../assets/svg/color.svg" alt="" ></label>
        </div>
        <div class="personalize-content-inputs">
          <div class="input-field" :class="{hiddenInput: formControlElements.imageInputActive}">
            <label for="company-logo">Company logo</label>
            <input  type="file" @change="handleImage" id="image-input" name="company-logo" accept="image/png, image/jpeg, image/tiff, image/gif">
          </div>

          <div class="input-field" :class="{hiddenInput: formControlElements.companyNameInput}">
            <label for="company-name">Company name</label>
            <input type="text" name="company-name">
          </div>

          <div class="input-field" :class="{hiddenInput: formControlElements.urlInput}">
            <label for="url">Url</label>
            <input type="url" name="url">
          </div>

          <div class="input-field" :class="{hiddenInput: formControlElements.colorInput}">
            <label for="color">Color</label>
            <input type="text" name="color">
          </div>
        </div>
      </div>

      <div class="buttons">
        <button class="back-button" @click.prevent="back"> &#x25C0 Back</button>
        <button @click.prevent="submit">{{ formContentElements.currentButtonText }}</button>
      </div>
    </form>
  </div>
</template>

<style src="../css/app-form.css"></style>
<script src="../js/app-form.js"></script>
