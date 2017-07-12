<template>
  <div id="form">
    <form id="app-form" class="form">
      <h1>{{ title }}</h1>
			<label for="website">Website of the issuer</label>
			<input type="text" name="website" v-model="websiteValue">

			<label for="e-mail">E-mail of the recipient</label>
			<input type="email" name="e-mail" v-model="emailValue">

			<label for="searchField">Search skill</label>
      <input class="searchField" type="text" name="searchField" v-model="searchValue" v-on:keyup="onChangeSearch">
			<ol class="list">
        <li v-for="searchResult in searchResults">
          {{ searchResult }}
        </li>
      </ol>

      <label for="searchField">Reason why the recipient deserves the badge</label>
			<textarea name="description" rows="4" cols="50"></textarea>

      <div class="company-info">
        <input type="file" v-on:change="handleImage" id="image-input" accept="image/png, image/jpeg, image/tiff, image/gif, image/svg+xml">
        <img id="image"/>
        <label for="company-name">Company name</label>
        <input type="text" name="company-name" >
        <label for="url">Url image</label>
        <input type="url" name="url" >
      </div>

      <button v-on:click.prevent="submit">Sign</button>

      <button v-on:click.prevent="submit">Generate</button>
    </form>
  </div>
</template>

<style src="../css/app-form.css"></style>
<script src="../js/app-form.js"></script>
