workflow "Build and Test" {
  on = "push"
  resolves = ["Run Tests"]
}

action "Install Dependencies" {
  uses = "nuxt/actions-yarn@node-10"
  args = "install"
}

action "Run Tests" {
  uses = "alexlafroscia/actions-ember-testing@master"
  needs = ["Install Dependencies"]
}
