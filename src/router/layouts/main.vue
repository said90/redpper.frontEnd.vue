<script>
import TopBar from '@components/top-bar'
import NavBar from '@components/nav-bar'
import RightBar from '@components/right-bar'
import Footer from '@components/footer'

export default {
  components: { TopBar, NavBar, RightBar, Footer },
  data() {
    return {
      isMenuOpened: false,
      user: this.$store ? this.$store.state.auth.currentUser : {} || {},
    }
  },
  created: () => {
    document.body.classList.remove('authentication-bg')
    document.body.classList.remove('authentication-bg-pattern')
  },

  methods: {
    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened
    },
    toggleRightSidebar() {
      document.body.classList.toggle('right-bar-enabled')
    },
    hideRightSidebar() {
      document.body.classList.remove('right-bar-enabled')
    },
  },
}
</script>

<template>
  <div>
    <header id="topnav">
      <TopBar
        :user="user"
        :is-menu-opened="isMenuOpened"
      />
      <NavBar :is-menu-opened="isMenuOpened" />
    </header>

    <div class="wrapper">
      <div class="container-fluid">
        <slot />
      </div>
      <Footer />
      <RightBar />
    </div>
  </div>
</template>