import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Define custom global properties
app.use(router);
app.mount("#app");
