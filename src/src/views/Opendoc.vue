<template>
     <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
    <div class="how-to-use">
      <h1>How to use this website</h1>
      <p>
        There are 4 main categories at the top of the page. The first one is "Activity", which contains "All Activity", "Photo", and "Calendar". In "All Activity", you can see all the current club activities. When an activity is marked as "closed", you cannot join it, but you can still view its content. If you are interested in a particular event, click "Request to Join". At the bottom of the page, you can see all the people who want to join.
      </p>
      <p>
        In "Photo", you can find all past photos. If you want to upload your own photos, please contact 10528@qq.com. The "Calendar" contains upcoming events.
      </p>
      <p>
        In "Members", you can find information about all members. If you want to contact a member, click on their name to view their personal information and past activities they have participated in.
      </p>
      <p>
        In "About Me", you can update your personal information. If you don't want to make your information public in the Members section, simply don't select that option. You can also change your username and password here. Please note that the "Username" is the username required for logging in!
      </p>
      <p>
        In "Edit My Avatar", choose your avatar to display! When you click "Choose Avatar" and select an avatar, you need to click "Confirm Avatar" again to successfully upload.
      </p>
      <p>
        If you got any problem about this website, please contact skw0852@aut.ac.nz
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "HowToUse",
  };
  </script>
  
  <style scoped>
  .how-to-use {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    line-height: 1.6;
  }
  
  h1 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #333;
  }
  </style>
  
