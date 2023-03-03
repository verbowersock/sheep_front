import { createApp } from "vue";
import App from "./App.vue";

import { Quasar, Dialog, Notify } from "quasar";

import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import "@quasar/extras/material-icons-sharp/material-icons-sharp.css";
import "quasar/src/css/index.sass";
import axios from "axios";
import VueAxios from "vue-axios";
import { createVuesticEssential, VaButton } from "vuestic-ui";
import "vuestic-ui/styles/essential.css";
import "vuestic-ui/styles/grid.css";
import "vuestic-ui/styles/reset.css";
import "vuestic-ui/styles/typography.css";
import { createVuestic } from "vuestic-ui";

const app = createApp(App);

//app.use(VuesticPlugin);
app.use(Quasar, {
  plugins: { Dialog, Notify }, // import Quasar plugins and add here
});

app.use(VueAxios, axios);
app.use(createVuestic());
//app.provide(DefaultApolloClient, apolloClient);
app.provide("axios", app.config.globalProperties.axios);

app.use(createVuesticEssential({ components: { VaButton } }));
app.mount("#app");
