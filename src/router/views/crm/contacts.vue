<script>
import { required } from 'vuelidate/lib/validators'

import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'vue2-datepicker'

import Swal from 'sweetalert2'

/**
 * CRM-contacts component
 */
export default {
  page: {
    title: 'Contacts',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, PageHeader, DatePicker },
  data() {
    return {
      fields: [
        'nombres',
        'apellidos',
        'fechaNacimiento',
        'edad',
        'sexo',
        'telefono',
        'direccion',
        'correoElectronico',
        { key: 'actions', label: 'Actions' },
      ],
      contactData: [],
      title: 'Cartera de Clientes',
      items: [
        {
          text: 'UBold',
          href: '/',
        },
        {
          text: 'CRM',
          href: '/',
        },
        {
          text: 'Contacts',
          active: true,
        },
      ],
      contacts: {
        nombres: '',
        apellidos: '',
        sexo: '',
        fechaNacimiento: '',
        dui: '',
        nit: '',
        direccion: '',
        telefono: '',
        correoElectronico: '',
      },
      selectedContact: {},
      submitted: false,
      showmodal: false,
      totalRows: 1,
      perPage: 5,
      currentPage: 1,
      filter: null,
      filterOn: [],
    }
  },
  validations: {
    contacts: {
      nombres: { required },
      apellidos: { required },
      sexo: { required },
    },
  },
  computed: {
    rows() {
      return this.contactData.length
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.contactData.length
    this.getClientes()
  },
  methods: {
    getClientes() {
      var self = this
      axios.get('http://localhost:5000/api/clientes').then((response) => {
        self.contactData = response.data.map((x) => {
          return x.persona
        })

        self.contactData.forEach((element) => {
          element.edad = moment().diff(element.fechaNacimiento, 'year', false)
          element.fechaNacimiento = moment(element.fechaNacimiento).format(
            'DD-MM-YYYY'
          )
          element.sexo = element.sexo === 'M' ? 'Masculino' : 'Femenino'
        })

        console.log(self.contactData)
      })
    },
    seleccionarCliente(cliente) {
      cliente[0].edad = moment().diff(cliente[0].fechaNacimiento, 'year', false)
      this.selectedContact = cliente[0]
    },
    modificarClientes(row) {
      this.contacts = row.item
      this.showmodal = true
    },

    /**
     * Modal form submit
     */
    handleSubmit(e) {
      debugger
      this.submitted = true

      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        return ''
      } else {
        var self = this
        this.contacts.fechaNacimiento = moment(
          this.contacts.fechaNacimiento
        ).format('YYYY-MM-DD')
        axios
          .post('http://localhost:5000/api/clientes', this.contacts)
          .then((response) => {
            if (response) {
              Swal.fire(
                'Almacenado',
                'La persona se añadió correctamente',
                'success'
              )
            }
            console.log(response)
            self.getClientes()
          })
        this.submitted = false
        this.showmodal = false
      }
    },
    /**
     * hode mondal on close
     */
    hideModal(e) {
      this.submitted = false
      this.showmodal = false
      this.contacts = {}
    },

    /**
     * Filter the data of search
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-4">
                <form class="form-inline">
                  <div class="form-group mb-2">
                    <label class="sr-only">Search</label>
                    <b-form-input
                      id="filterInput"
                      v-model="filter"
                      type="search"
                      placeholder="Buscar Cliente"
                    ></b-form-input>
                  </div>
                </form>
              </div>
              <div class="col-sm-8">
                <div class="text-sm-right">
                  <b-button
                    href="javscript: void(0);"
                    class="mb-2"
                    variant="danger"
                    type="button"
                    @click="showmodal = true"
                  >
                    <i class="mdi mdi-plus-circle mr-1"></i> Agregar Cliente
                  </b-button>
                </div>
              </div>
              <!-- end col-->
            </div>

            <div>
              <b-table
                id="my-table"
                selectable
                select-mode="single"
                :fields="fields"
                :items="contactData"
                :per-page="perPage"
                :current-page="currentPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                hover
                @filtered="onFiltered"
                @row-selected="seleccionarCliente"
              >
                <template v-slot:cell(fechaNacimiento)="data">{{
                  data.item.fechaNacimiento !== null
                    ? data.item.fechaNacimiento
                    : '-'
                }}</template>
                <template v-slot:cell(edad)="data">{{
                  data.item.edad ? data.item.edad : '-'
                }}</template>
                <template v-slot:cell(telefono)="data">{{
                  data.item.telefono ? data.item.telefono : '-'
                }}</template>
                <template v-slot:cell(direccion)="data">{{
                  data.item.direccion ? data.item.direccion : '-'
                }}</template>
                <template v-slot:cell(correoElectronico)="data">{{
                  data.item.correoElectronico
                    ? data.item.correoElectronico
                    : '-'
                }}</template>

                <template v-slot:cell(actions)="row">
                  <a
                    href="javascript:void(0);"
                    class="action-icon"
                    @click="modificarClientes(row)"
                  >
                    <i class="mdi mdi-square-edit-outline"></i>
                  </a>

                  <a class="action-icon">
                    <i class="mdi mdi-delete"></i>
                  </a>
                </template>
              </b-table>
            </div>

            <ul class="pagination pagination-rounded justify-content-end my-2">
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="card-box">
          <div class="media mb-3">
            <img
              class="d-flex mr-3 rounded-circle avatar-lg"
              src="@assets/images/users/user-8.jpg"
              alt="Generic placeholder image"
            />
            <div class="media-body">
              <h3 class="mt-0 mb-1"
                >{{ selectedContact.nombres }}
                {{ selectedContact.apellidos }}</h3
              >
            </div>
          </div>

          <h5 class="mb-3 mt-4 text-uppercase bg-light p-2">
            <i class="mdi mdi-account-circle mr-1"></i> Informacion Personal de
            Cliente
          </h5>
          <div class>
            <h4 class="font-13 text-muted text-uppercase">About Me :</h4>
            <p class="mb-3">
              Hi I'm Johnathn Deo,has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type.
            </p>

            <h4 class="font-13 text-muted text-uppercase mb-1"
              >Fecha de Cumpleanos:</h4
            >
            <p class="mb-3">{{ selectedContact.fechaNacimiento }}</p>

            <h4 class="font-13 text-muted text-uppercase mb-1">Telefono :</h4>
            <p class="mb-3">{{ selectedContact.telefono }}</p>

            <h4 class="font-13 text-muted text-uppercase mb-1"
              >Direccion de residencia :</h4
            >
            <p class="mb-3">{{ selectedContact.direccion }}</p>

            <h4 class="font-13 text-muted text-uppercase mb-1">Email :</h4>
            <p class="mb-0">{{ selectedContact.correoElectronico }}</p>
          </div>
        </div>
        <!-- end card-box-->
      </div>
    </div>

    <!-- Modal -->
    <b-modal
      id="modal-1"
      v-model="showmodal"
      title="Agregar Contacto"
      header-bg-variant="dark"
      header-close-variant="light"
      title-class="text-light font-18"
      hide-footer
    >
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nombres</label>
          <input
            id="name"
            v-model="contacts.nombres"
            type="text"
            class="form-control"
            placeholder="Ingresar nombres"
            :class="{ 'is-invalid': submitted && $v.contacts.nombres.$error }"
          />
          <div
            v-if="submitted && !$v.contacts.nombres.required"
            class="invalid-feedback"
            >El campo nombres es requerido</div
          >
        </div>
        <div class="form-group">
          <label for="apellidos">Apellidos</label>
          <input
            id="apellidos"
            v-model="contacts.apellidos"
            type="text"
            class="form-control"
            placeholder="Ingresar Apellidos"
            :class="{ 'is-invalid': submitted && $v.contacts.apellidos.$error }"
          />
          <div
            v-if="submitted && !$v.contacts.apellidos.required"
            class="invalid-feedback"
            >El campo apellidos es requerido</div
          >
        </div>

        <div class="form-group">
          <label for="sexo">Sexo</label>
          <input
            id="sexo"
            v-model="contacts.sexo"
            type="text"
            class="form-control"
            placeholder="Seleccione sexo"
            :class="{ 'is-invalid': submitted && $v.contacts.sexo.$error }"
          />
          <div
            v-if="submitted && !$v.contacts.sexo.required"
            class="invalid-feedback"
            >El campo sexo es requerido</div
          >
        </div>

        <div class="form-group">
          <label for="fechaNacimiento">Fecha de Nacimiento</label>
          <date-picker
            v-model="contacts.fechaNacimiento"
            format="DD-MM-YYYY"
            value-type="format"
            lang="es"
          ></date-picker>
        </div>

        <div class="form-group">
          <label for="dui">DUI</label>
          <input
            v-model="contacts.dui"
            v-mask="'########-#'"
            type="text"
            class="form-control"
            placeholder="Ingresar DUI"
          />
        </div>

        <div class="form-group">
          <label for="nit">NIT</label>
          <input
            v-model="contacts.nit"
            v-mask="'####-######-###-#'"
            type="text"
            class="form-control"
            placeholder="Ingresar NIT"
          />
        </div>

        <div class="form-group">
          <label for="direccion">Direccion</label>
          <input
            id="direccion"
            v-model="contacts.direccion"
            type="text"
            class="form-control"
            placeholder="Ingresar Direccion"
          />
        </div>
        <div class="form-group">
          <label for="telefono">Telefono</label>
          <input
            v-model="contacts.telefono"
            v-mask="'####-####'"
            type="text"
            class="form-control"
            placeholder="Ingresar telefono"
          />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            id="email"
            v-model="contacts.email"
            type="email"
            name="email"
            class="form-control"
            placeholder="Enter email"
          />
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-success">Save</button>
          <b-button class="ml-1" variant="danger" @click="hideModal"
            >Cancel</b-button
          >
        </div>
      </form>
    </b-modal>
    <!-- end modal -->
  </Layout>
</template>
