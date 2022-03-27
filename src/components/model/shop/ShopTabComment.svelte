<script lang="ts">
import { onMount } from 'svelte';
import ShopModalForm from './ShopModalForm.svelte';
import { authStore } from '../../../store/authStore';
import type { firebase } from '../../../firebase/config';
import { timestamp } from '../../../firebase/config';
import { firestoreUseCase } from '../../../middleware/firestoreClient';
import type { Comment } from '../../../@types/index';
import ModalError from '../../../components/ui/ModalError.svelte';
export let id;
export let comments: Array<Comment>;

let setToggleModal = false;
let setToggleModalError: boolean = false;
let comment = '';
let user: firebase.User;

const unsub = authStore.subscribe((data) => {
  user = data;
});

onMount(async () => {
  unsub();
});

const openModal = () => {
  if (!user) {
    openModalError();
    return;
  }
  setToggleModal = true;
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  setToggleModal = false;
  document.body.style.overflow = '';
  comment = '';
};
const openModalError = () => {
  setToggleModalError = true;
  document.body.style.overflow = 'hidden';
};

const closeModalError = () => {
  setToggleModalError = false;
  document.body.style.overflow = '';
};

const postComment = () => {
  const { displayName, photoURL } = user;
  const post = {
    id: Math.random(),
    content: comment,
    displayName,
    photoURL,
    createdAt: timestamp.fromDate(new Date()),
  };
  firestoreUseCase.addSubDocument(post, id, 'comment');
  comments = [...comments, post];
};
</script>

<div class="shop-comment-container">
  {#each comments as comment}
    <div class="balloon6">
      <div class="faceicon">
        <img src="{comment.photoURL}" class="" alt="" />
      </div>
      <div class="chatting">
        <div class="says">
          <p>
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  {/each}
  <div class="button-wrapper">
    <button class="btn" on:click="{openModal}">追加する</button>
  </div>
</div>

{#if setToggleModal}
  <ShopModalForm on:close-modal="{closeModal}" on:click-handler="{postComment}">
    <div class="post-form-container">
      <div class="form">
        <div class="form-field">
          <label class="label" for="comment">comment</label>
          <textarea class="input" id="comment" bind:value="{comment}"
          ></textarea>
        </div>
      </div>
    </div>
  </ShopModalForm>
{/if}
{#if setToggleModalError}
  <ModalError on:close-modal="{closeModalError}">
    <p class="message">ログインしてください</p>
  </ModalError>
{/if}
