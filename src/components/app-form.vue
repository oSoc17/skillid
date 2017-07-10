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

      <button v-on:click="submit">Generate</button>
    </form>
  </div>
</template>

<style src="../css/app-form.css"></style>
<script src="../js/app-form.js"></script>
