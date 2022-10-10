//please be aware that if you change the url (for the api), then you will
//need to change it in the .env file in the root folder
//the reason why we can't have only one is that the frontend
//cannot access resources outside itself. feel free to solve this problem 
const env = {"url": "http://localhost:" + (process.env.PORT || 5555) + "/api/articles"}

export default env;