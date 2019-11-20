<script>
import { authComputed } from '@state/helpers'

export default {
  components: {},
  props: {
    user: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    isMenuOpened: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...authComputed,
  },
  mounted() {
    var links = document.getElementsByClassName('side-nav-link-ref')
    var matchingMenuItem = null
    for (var i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i].pathname) {
        matchingMenuItem = links[i]
        break
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active')
      var parent = matchingMenuItem.parentElement

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add('active')
        const parent2 = parent.parentElement
        if (parent2) {
          parent2.classList.add('in')
        }
        const parent3 = parent2.parentElement
        if (parent3) {
          parent3.classList.add('active')
          var childAnchor = parent3.querySelector('.has-dropdown')
          if (childAnchor) childAnchor.classList.add('active')
        }

        const parent4 = parent3.parentElement
        if (parent4) parent4.classList.add('in')
        const parent5 = parent4.parentElement
        if (parent5) parent5.classList.add('active')
      }
    }
  },
  methods: {
    onMenuClick(event) {
      event.preventDefault()
      const nextEl = event.target.nextSibling
      if (nextEl && !nextEl.classList.contains('open')) {
        const parentEl = event.target.parentNode
        if (parentEl) {
          parentEl.classList.remove('open')
        }

        nextEl.classList.add('open')
      } else if (nextEl) {
        nextEl.classList.remove('open')
      }
      return false
    },
    /**
     * Dark Menubar
     */
    darkTopbar() {
      document.body.classList.add('topbar-dark')
      document.body.classList.remove('topbar-light')
      document.body.classList.remove('unsticky-header')
      document.body.classList.remove('boxed-layout')
      document.body.classList.remove('drop-menu-dark')
      document.body.classList.remove('menubar-light')
      document.body.classList.remove('center-menu')
    },

    /**
     * Light Topbar
     */
    lightMenubar() {
      document.body.classList.add('menubar-light')
      document.body.classList.add('topbar-dark')
      document.body.classList.remove('boxed-layout')
      document.body.classList.remove('center-menu')
      document.body.classList.remove('gradient-topbar')
      document.body.classList.remove('unsticky-header')
    },

    /**
     * Show menu in center
     */
    centerMenu() {
      document.body.classList.add('center-menu')
      document.body.classList.remove('topbar-dark')
      document.body.classList.remove('menubar-light')
      document.body.classList.remove('boxed-layout')
      document.body.classList.remove('gradient-topbar')
    },

    gradientTopbar() {
      document.body.classList.add('gradient-topbar')
      document.body.classList.add('topbar-dark')
      document.body.classList.remove('drop-menu-dark')
      document.body.classList.remove('unsticky-header')
      document.body.classList.remove('center-menu')
    },

    dropmenuDark() {
      document.body.classList.add('drop-menu-dark')
      document.body.classList.remove('gradient-topbar')
      document.body.classList.remove('boxed-layout')
      document.body.classList.remove('center-menu')
      document.body.classList.remove('menubar-light')
    },
    /**
     * Unsticky Header
     */
    unstickyHeader() {
      document.body.classList.add('unsticky-header')
      document.body.classList.remove('boxed-layout')
      document.body.classList.remove('center-menu')
      document.body.classList.remove('drop-menu-dark')
      document.body.classList.remove('topbar-dark')
      document.body.classList.remove('menubar-light')
    },

    /**
     * Boxed Layout
     */
    boxedLayout() {
      document.body.classList.add('boxed-layout')
      document.body.classList.remove('drop-menu-dark')
      document.body.classList.remove('gradient-topbar')
      document.body.classList.remove('topbar-dark')
      document.body.classList.remove('menubar-light')
    },
  },
}
</script>

<template>
  <!-- Topbar Start -->
  <div class="topbar-menu">
    <div class="container-fluid">
      <b-collapse
        id="navigation"
        v-model="isMenuOpened"
      >
        <!-- Navigation Menu-->
        <ul class="navigation-menu">
          <li class="has-submenu">
            <a
              href="#"
              @click="onMenuClick"
            >
              <i class="fe-airplay"></i>Dashboards
              <div class="arrow-down"></div>
            </a>
            <ul class="submenu">
              <li>
                <router-link
                  tag="a"
                  to="/"
                  class="side-nav-link-ref"
                >Dashboard 1</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/dashboards/dashboard2"
                  class="side-nav-link-ref"
                >Dashboard 2</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/dashboards/dashboard3"
                  class="side-nav-link-ref"
                >Dashboard 3</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/dashboards/dashboard4"
                  class="side-nav-link-ref"
                >Dashboard 4</router-link>
              </li>
            </ul>
          </li>
          <li class="has-submenu">
            <a
              href="#"
              @click="onMenuClick"
            >
              <i class="fe-grid"></i>Apps
              <div class="arrow-down"></div>
            </a>
            <ul class="submenu">
              <li class="has-submenu">
                <a
                  href="#"
                  @click="onMenuClick"
                >
                  CRM
                  <div class="arrow-down"></div>
                </a>
                <ul class="submenu">
                  <li>
                    <router-link
                      tag="a"
                      to="/crm/crmdashboard"
                      class="side-nav-link-ref"
                    >Dashboard</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/crm/contacts"
                      class="side-nav-link-ref"
                    >Contacts</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/crm/opportunities"
                      class="side-nav-link-ref"
                    >Opportunities</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/crm/leads"
                      class="side-nav-link-ref"
                    >Leads</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/crm/customers"
                      class="side-nav-link-ref"
                    >Customers</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-submenu">
                <a
                  href="#"
                  @click="onMenuClick"
                >
                  eCommerce
                  <div class="arrow-down"></div>
                </a>
                <ul class="submenu">
                  <li>
                    <router-link
                      tag="a"
                      to="/ecommerce/ecommercedashboard"
                      class="side-nav-link-ref"
                    >Dashboard</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ecommerce/products"
                      class="side-nav-link-ref"
                    >Products</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ecommerce/productdetail"
                      class="side-nav-link-ref"
                    >Product Detail</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ecommerce/productedit"
                      class="side-nav-link-ref"
                    >Product Edit</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ecommerce/orders"
                      class="side-nav-link-ref"
                    >Orders</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ecommerce/sellers"
                      class="side-nav-link-ref"
                    >Sellers</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-submenu">
                <a
                  href="#"
                  @click="onMenuClick"
                >
                  Email
                  <div class="arrow-down"></div>
                </a>
                <ul class="submenu">
                  <li>
                    <router-link
                      tag="a"
                      to="/email/inbox"
                      class="side-nav-link-ref"
                    >Inbox</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/email/reademail"
                      class="side-nav-link-ref"
                    >Read Email</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/email/emailcompose"
                      class="side-nav-link-ref"
                    >Compose Email</router-link>
                  </li>
                </ul>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/apps/kanbanboard"
                  class="side-nav-link-ref"
                >Kanban Board</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/apps/calendar"
                  class="side-nav-link-ref"
                >Calendar</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/apps/appcontacts"
                  class="side-nav-link-ref"
                >Contacts</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/apps/projects"
                  class="side-nav-link-ref"
                >Projects</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/apps/tickets"
                  class="side-nav-link-ref"
                >Tickets</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/apps/companies"
                  class="side-nav-link-ref"
                >Companies</router-link>
              </li>
            </ul>
          </li>
          <li class="has-submenu">
            <a
              href="#"
              @click="onMenuClick"
            >
              <i class="fe-briefcase"></i>Elements
              <div class="arrow-down"></div>
            </a>
            <ul class="submenu megamenu">
              <li>
                <ul>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/buttons"
                      class="side-nav-link-ref"
                    >Buttons</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/cards"
                      class="side-nav-link-ref"
                    >Cards</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/portlets"
                      class="side-nav-link-ref"
                    >Portlets</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/tabs"
                      class="side-nav-link-ref"
                    >Tabs & Accordions</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/modals"
                      class="side-nav-link-ref"
                    >Modals</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/progress"
                      class="side-nav-link-ref"
                    >Progress</router-link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/notifications"
                      class="side-nav-link-ref"
                    >Notifications</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/images"
                      class="side-nav-link-ref"
                    >Images</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/carousel"
                      class="side-nav-link-ref"
                    >Carousel</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/video"
                      class="side-nav-link-ref"
                    >Embed video</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/dropdown"
                      class="side-nav-link-ref"
                    >Dropdowns</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/spinners"
                      class="side-nav-link-ref"
                    >Spinners</router-link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/ribbons"
                      class="side-nav-link-ref"
                    >Ribbons</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/tooltip"
                      class="side-nav-link-ref"
                    >Tooltips & Popovers</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/generalui"
                      class="side-nav-link-ref"
                    >General UI</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/typography"
                      class="side-nav-link-ref"
                    >Typography</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/ui/grid"
                      class="side-nav-link-ref"
                    >Grid</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="has-submenu">
            <a
              href="#"
              @click="onMenuClick"
            >
              <i class="fe-cpu"></i>Admin UI
              <div class="arrow-down"></div>
            </a>
            <ul class="submenu">
              <li>
                <router-link
                  tag="a"
                  to="/adminui/widgets"
                  class="side-nav-link-ref"
                >Widgets</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/adminui/nestable"
                  class="side-nav-link-ref"
                >Nestable List</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/adminui/rangeslider"
                  class="side-nav-link-ref"
                >Range Slider</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/adminui/animations"
                  class="side-nav-link-ref"
                >Animations</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/adminui/sweetalert"
                  class="side-nav-link-ref"
                >Sweet Alert</router-link>
              </li>
              <li>
                <router-link
                  tag="a"
                  to="/adminui/tour"
                  class="side-nav-link-ref"
                >Tour Page</router-link>
              </li>
            </ul>
          </li>
          <li class="has-submenu">
            <a
              href="#"
              @click="onMenuClick"
            >
              <i class="fe-layers"></i>Components
              <div class="arrow-down"></div>
            </a>
            <ul class="submenu">
              <li class="has-submenu">
                <a
                  href="#"
                  @click="onMenuClick"
                >
                  Forms
                  <div class="arrow-down"></div>
                </a>
                <ul class="submenu">
                  <li>
                    <router-link
                      tag="a"
                      to="/forms/elements"
                      class="side-nav-link-ref"
                    >General Elements</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/forms/advanced"
                      class="side-nav-link-ref"
                    >Advanced</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/forms/validation"
                      class="side-nav-link-ref"
                    >Validation</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/forms/wizard"
                      class="side-nav-link-ref"
                    >Wizard</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/forms/quilljs"
                      class="side-nav-link-ref"
                    >Quilljs Editor</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/forms/uploads"
                      class="side-nav-link-ref"
                    >File Uploads</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-submenu">
                <a
                  href="#"
                  @click="onMenuClick"
                >
                  Tables
                  <div class="arrow-down"></div>
                </a>
                <ul class="submenu">
                  <li>
                    <router-link
                      tag="a"
                      to="/tables/basictable"
                      class="side-nav-link-ref"
                    >Basic Tables</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/tables/advancedtable"
                      class="side-nav-link-ref"
                    >Advanced Table</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-submenu">
                <a
                  href="#"
                  @click="onMenuClick"
                >
                  Charts
                  <div class="arrow-down"></div>
                </a>
                <ul class="submenu">
                  <li>
                    <router-link
                      tag="a"
                      to="/charts/apex"
                      class="side-nav-link-ref"
                    >Apex Charts</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/charts/chartjs"
                      class="side-nav-link-ref"
                    >Chartjs Charts</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/charts/chartist"
                      class="side-nav-link-ref"
                    >Chartist Charts</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/charts/c3"
                      class="side-nav-link-ref"
                    >C3 Charts</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/charts/knob"
                      class="side-nav-link-ref"
                    >Knob Charts</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-submenu">
                <a
                  href="#"
                  @click="onMenuClick"
                >
                  Icons
                  <div class="arrow-down"></div>
                </a>
                <ul class="submenu">
                  <li>
                    <router-link
                      tag="a"
                      to="/icons/feather"
                      class="side-nav-link-ref"
                    >Feather Icons</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/icons/material"
                      class="side-nav-link-ref"
                    >Material Design Icons</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/icons/dripicons"
                      class="side-nav-link-ref"
                    >Dripicons</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/icons/fontawesome"
                      class="side-nav-link-ref"
                    >Font Awesome</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/icons/themify"
                      class="side-nav-link-ref"
                    >Themify</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/icons/simpleline"
                      class="side-nav-link-ref"
                    >Simple Line</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/icons/weather"
                      class="side-nav-link-ref"
                    >Weather</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-submenu">
                <a
                  href="#"
                  @click="onMenuClick"
                >
                  Maps
                  <div class="arrow-down"></div>
                </a>
                <ul class="submenu">
                  <li>
                    <router-link
                      tag="a"
                      to="/maps/google"
                      class="side-nav-link-ref"
                    >Google Maps</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="has-submenu">
            <a
              href="#"
              @click="onMenuClick"
            >
              <i class="fe-package"></i>Pages
              <div class="arrow-down"></div>
            </a>
            <ul class="submenu megamenu">
              <li>
                <ul>
                  <li>
                    <router-link
                      tag="a"
                      to="/extras/profile"
                      class="side-nav-link-ref"
                    >Profile</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/extras/timeline"
                      class="side-nav-link-ref"
                    >Timeline</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/extras/sitemap"
                      class="side-nav-link-ref"
                    >Sitemap</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/extras/invoice"
                      class="side-nav-link-ref"
                    >Invoice</router-link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <router-link
                      tag="a"
                      to="/extras/faqs"
                      class="side-nav-link-ref"
                    >FAQs</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/extras/pricing"
                      class="side-nav-link-ref"
                    >Pricing</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/errors/error404"
                      class="side-nav-link-ref"
                    >Error 404</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/errors/error500"
                      class="side-nav-link-ref"
                    >Error 500</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="has-submenu">
            <a
              href="#"
              @click="onMenuClick"
            >
              <i class="fe-sidebar"></i>Layouts
              <div class="arrow-down"></div>
            </a>
            <ul class="submenu">
              <li>
                <a
                  href="javascript: void(0);"
                  class="side-nav-link-ref"
                  @click="darkTopbar"
                >
                  Topbar
                  Dark
                </a>
              </li>
              <li>
                <a
                  href="javascript: void(0);"
                  class="side-nav-link-ref"
                  @click="lightMenubar"
                >
                  Menubar
                  Light
                </a>
              </li>
              <li>
                <a
                  href="javascript: void(0);"
                  class="side-nav-link-ref"
                  @click="centerMenu"
                >
                  Center
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="javascript: void(0);"
                  class="side-nav-link-ref"
                  @click="gradientTopbar"
                >
                  Gradient
                  Topbar
                </a>
              </li>
              <li>
                <a
                  href="javascript: void(0);"
                  class="side-nav-link-ref"
                  @click="dropmenuDark"
                >
                  Menu Drop
                  Dark
                </a>
              </li>
              <li>
                <a
                  href="javascript: void(0);"
                  class="side-nav-link-ref"
                  @click="unstickyHeader"
                >
                  Unsticky
                  Header
                </a>
              </li>
              <li>
                <a
                  href="javascript: void(0);"
                  class="side-nav-link-ref"
                  @click="boxedLayout"
                >Boxed</a>
              </li>
            </ul>
          </li>
        </ul>
        <!-- End navigation menu -->

        <div class="clearfix"></div>
      </b-collapse>
      <!-- end #navigation -->
    </div>
    <!-- end container -->
  </div>
  <!-- end navbar-custom -->
</template>

<style lang="scss">
</style>
