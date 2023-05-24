import { createWebHashHistory, createRouter } from "vue-router";
import Viewer from "../views/Viewer.vue";
import Books from "../views/Books.vue";
import Tests from "../views/Tests.vue";
import Choose from "../views/Choose.vue"
import Quiz from "../views/Quiz.vue";

const routes = [
    {
        path: "/",
        name: "Books",
        component: Books,
    },
    {
        path: '/tests',
        name: "Tests",
        component: Tests
    },
    {
        path: '/choose',
        name: "Choose",
        component: Choose
    },
    {
        path: '/quiz',
        name: "Quiz",
        component: Quiz
    },
    {
        path: "/viewer",
        name: "Viewer",
        component: Viewer
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;