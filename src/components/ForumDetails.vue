<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="700">
      <v-row>
        <v-col cols="9">
          <h2>{{ forum.title }}</h2>
          <p>{{forum.body}}</p>
          <v-icon :style="{color: clicked ? 'red' : 'blue'}" color="blue" size="small" class="me-2" @click="voteUpForum('up_vote'); !clicked">
            mdi-thumb-up
          </v-icon>
          <v-icon color="blue" size="small" class="me-2" @click="voteDownForum('down_vote')">
            mdi-thumb-down
          </v-icon>
          <v-icon color="blue" size="small" class="me-2" @click="showCommentInput = true; $nextTick(scrollToCommentSection)">mdi-comment</v-icon>
          <p class="pt-3">Total Vote Count ({{total_forum_vote}})</p>
        </v-col>
        <v-col cols="3">
          <v-btn color="black" @click="backToList">Back</v-btn>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>

      <div ref="commentSection">
        <h3 class="pb-3">Comments</h3>
        <div class="pb-5" v-for="comment in forum_commented_by" :key="comment.id">
              <p>
                <v-avatar color="info">
                  <v-icon icon="mdi-account-circle"></v-icon>
                </v-avatar>
                <b class="pl-2">{{ getCommentedByUserName(comment.user_id) }}</b>
              </p>
              <p>{{ comment.body }}</p>
            <v-icon color="blue" size="small" class="me-2" @click="upvoteComment(comment.id)">
              mdi-thumb-up
            </v-icon>
              <v-icon color="blue" size="small" class="me-2" @click="downVoteComment(comment.id)">
                mdi-thumb-down
              </v-icon>

          <div v-if="userId === comment.user_id">
          <v-icon color="orange" size="small" class="me-2" @click="editComment(comment)">
            mdi-pencil-box-outline
          </v-icon>
          <v-icon color="red" size="small" class="me-2" @click="deleteComment(comment.id)">
            mdi-delete-empty
          </v-icon>
          </div>
          <div class="pt-7" v-if="comment.editing">
            <v-text-field density="compact" variant="outlined"  v-model="comment.editedBody" outlined label="Edit Comment"></v-text-field>
            <v-btn color="blue" @click="updateComment(comment)">
              update
            </v-btn>
          </div>

        </div>
      </div>

      <div class="pt-7" v-if="showCommentInput">
        <h3>Add Comment</h3>
        <v-text-field density="compact" variant="outlined" v-model="newComment" label="Comment"></v-text-field>
        <v-btn color="primary" @click="submitComment">Submit</v-btn>
      </div>
    </v-card>
  </v-sheet>

</template>

<script>
import axios from "axios";

export default {
  data()
  {
    return {
      clicked: false,
      forum: {},
      forum_commented_by: [],
      newComment: "",
      showCommentInput: false,
      total_forum_vote:'',
      editedComment: '',
    };
  },
  created() {
    this.fetchForum();
  },
  computed: {
    userId() {
      console.log('user id', this.$store.state.authStore.user?.id);
      return this.$store.state.authStore.user?.id || null;
    },
  },
  methods:{
    scrollToCommentSection() {
      this.$nextTick(() => {
        this.$refs.commentSection.scrollIntoView({ behavior: 'smooth' });
      });
    },
    async deleteComment(commentId) {
      try {
        const apiUrl = `http://127.0.0.1:8000/api/comments/${commentId}`;
        const response = await axios.delete(apiUrl);
        console.log(response.data);
        // Remove the deleted comment from the local data
        this.forum_commented_by = this.forum_commented_by.filter(comment => comment.id !== commentId);
      } catch (error) {
        console.error(error);
      }
    },

    async editComment(comment) {
      comment.editing = true;
      comment.editedBody = comment.body;
    },
    async updateComment(comment) {
      try {
        const apiUrl = `http://127.0.0.1:8000/api/comments/${comment.id}`;
        const payload = {
          body: comment.editedBody,
        };

        const response = await axios.put(apiUrl, payload);
        console.log(response.data);
        comment.body = comment.editedBody;
        comment.editedBody = ''; // Clear the edited body
        comment.editing = false;
      } catch (error) {
        console.error(error);

      }
    },
    async upvoteComment(commentId) {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/comments/${commentId}/vote`, {
          user_id: this.userId,
          vote_type: 'up_vote'
        });
        console.log('Upvote API response:', response.data);

      } catch (error) {
        console.log('Upvote API error:', error);
      }
    },
    async downVoteComment(commentId) {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/comments/${commentId}/vote`, {
          user_id: this.userId,
          vote_type: 'down_vote'
        });
        console.log('Down vote API response:', response.data);

      } catch (error) {
        console.log('Down vote API error:', error);
      }
    },
    async submitComment() {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/forums/${this.forum.id}/comment`, {
          user_id: this.userId,
          body: this.newComment
        });
        const newComment = response.data.comment;
        console.log('comm', newComment)
        this.forum_commented_by.push(newComment);
        // Handle the response as needed
        console.log(response.data);

        // Reset the comment input and hide the input section
        this.newComment = '';
        this.showCommentInput = false;
      } catch (error) {
        console.log(error);
      }
    },
    async voteUpForum(voteType) {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/forums/${this.forum.id}/vote`, {
          user_id: this.userId,
          vote_type: voteType
        });
        console.log(response.data);
        this.clicked = true;
      } catch (error) {
        console.log(error);
      }
    },
    async voteDownForum(voteType) {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/forums/${this.forum.id}/vote`, {
          user_id: this.userId,
          vote_type: voteType
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    backToList()
    {
      this.$router.push({
        name: 'ForumList'
      })
    },
    async fetchForum() {
      try {
        const forumId = this.$route.params.id;
        const response = await axios.get(`http://127.0.0.1:8000/api/forums/${forumId}`);
        this.forum = response.data.forum;
        this.forum_commented_by = response.data.forum_commented_by;
        this.total_forum_vote = response.data.total_forum_vote;
        console.log('details', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    getCommentedByUserName(userId) {
      const commentOwner = this.forum_commented_by.find(comment => comment.user_id === userId);
      return commentOwner ? commentOwner.user.name : 'Unknown User';
    },

  }
}
</script>

<style>

</style>