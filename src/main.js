import { createApp } from "vue";
import App from "./App.vue";

import VuesticPlugin from "vuestic-ui";

import { Quasar, Dialog, Notify } from "quasar";

import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import "@quasar/extras/material-icons-sharp/material-icons-sharp.css";
import "quasar/src/css/index.sass";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

app.use(VuesticPlugin);
app.use(Quasar, {
  plugins: { Dialog, Notify }, // import Quasar plugins and add here
});
app.use(VueAxios, axios);
//app.provide(DefaultApolloClient, apolloClient);
app.provide("axios", app.config.globalProperties.axios);

app.mount("#app");
