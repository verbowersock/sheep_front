import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { apolloClient } from "./graphql/client";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { VuesticPlugin } from "vuestic-ui";
import "vuestic-ui/dist/vuestic-ui.css";

const app = createApp(App);

app.use(router);
app.use(VuesticPlugin);

app.provide(DefaultApolloClient, apolloClient);

app.mount("#app");
