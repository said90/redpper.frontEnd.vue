<script>
import { required } from 'vuelidate/lib/validators'

import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import Multiselect from 'vue-multiselect'

import Swal from 'sweetalert2'

/**
 * CRM-contacts component
 */
export default {
  page: {
    title: 'Cartera de Clientes',
  },
  components: { Layout, PageHeader, DatePicker, Multiselect },
  data() {
    return {
      columnasTabla: [
        'nombres',
        'apellidos',
        'sexo',
        { key: 'actions', label: 'Actions' },
      ],
      clientesTable: [],
      title: 'Cartera de Clientes',
      clientes: [],
      cliente: {
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
      clienteSeleccionado: {},
      sexoOpciones: ['Femenino', 'Masculino'],
      submitted: false,
      showmodal: false,
      totalRows: 1,
      perPage: 5,
      currentPage: 1,
      filter: null,
      filterOn: [],
      id: {},
    }
  },
  validations: {
    cliente: {
      nombres: { required },
      apellidos: { required },
      sexo: { required },
    },
  },
  computed: {
    rows() {
      return this.clientesTable.length
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.clientesTable.length
    this.getClientes()
  },
  methods: {
    getClientes() {
      var self = this
      axios.get('http://localhost:5000/api/clientes').then((response) => {
        self.clientes = response.data
        self.clientesTable = response.data.map((x) => {
          return x.persona
        })

        self.clientesTable.forEach((element) => {
          element.edad = moment().diff(element.fechaNacimiento, 'year', false)
          element.fechaNacimiento = moment(element.fechaNacimiento).format(
            'DD-MM-YYYY'
          )
          element.sexo = element.sexo === 'M' ? 'Masculino' : 'Femenino'
        })

        console.log(self.clientesTable)
      })
    },
    seleccionarCliente(cliente) {
      cliente[0].edad = moment().diff(cliente[0].fechaNacimiento, 'year', false)
      this.clienteSeleccionado = cliente[0]
    },
    llenarCliente(row) {
      this.cliente = row.item
      this.$bvModal.show('modificar-modal')
    },
    eliminarCliente(row) {
      var self = this
      var cliente = this.clientes.find((x) => x.idPersona === row.item.id)
      var data = { id: cliente.id }
      this.id = data
      Swal.fire({
        title: 'Esta seguro de eliminar este cliente?',
        text: 'Si eliminas este cliente esta informacion no podra recuperarse.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si eliminar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eleminado satisfactoriamente.',
            'success'
          )
          axios.delete('http://localhost:5000/api/clientes', {
            params: data,
          })
          self.getClientes()
        } else {
          
        }
      })
    },

    /**
     * Modal form submit
     */
    handleSubmit(e) {
      this.submitted = true

      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        return ''
      } else {
        var self = this
        this.cliente.fechaNacimiento = moment(
          this.cliente.fechaNacimiento
        ).format('YYYY-MM-DD')
        axios
          .post('http://localhost:5000/api/clientes', this.cliente)
          .then((response) => {
            if (response) {
              Swal.fire(
                'Almacenado',
                'La cliente se agrego correctamente',
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
    modificarCliente(e) {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return ''
      } else {
        var self = this
        var cliente = this.clientes.find((x) => x.idPersona === this.cliente.id)
        cliente.persona = this.cliente
        cliente.persona.fechaNacimiento = moment(
          cliente.persona.fechaNacimiento,
          'DD-MM-YYYY'
        )
        cliente.persona.fechaNacimiento = cliente.persona.fechaNacimiento.toDate()
        axios
          .put('http://localhost:5000/api/clientes', cliente)
          .then((response) => {
            if (response) {
              Swal.fire(
                'Modificar',
                'El cliente se modifico correctamente',
                'success'
              )
            }
            self.$bvModal.hide('modificar-modal')
          })
      }
    },
    /**
     * hode mondal on close
     */
    hideModal(e) {
      this.submitted = false
      this.showmodal = false
      this.cliente = {}
      this.$bvModal.hide('modificar-modal')
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
    <PageHeader :title="title" />
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
                :fields="columnasTabla"
                :items="clientesTable"
                :per-page="perPage"
                :current-page="currentPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                hover
                @filtered="onFiltered"
                @row-selected="seleccionarCliente"
              >
                <template v-slot:cell(actions)="row">
                  <a
                    href="javascript:void(0);"
                    class="action-icon"
                    @click="llenarCliente(row)"
                  >
                    <i class="mdi mdi-square-edit-outline"></i>
                  </a>

                  <a class="action-icon" @click="eliminarCliente(row)">
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
            <div class="media-body">
              <h2 class="mt-0 mb-1" style="text-align:center">
                {{ clienteSeleccionado.nombres }}
                {{ clienteSeleccionado.apellidos }}
              </h2>
            </div>
          </div>

          <h5 class="mb-3 mt-4 text-uppercase bg-light p-2">
            <i class="mdi mdi-account-circle mr-1"></i> Informacion Personal de
            Cliente
          </h5>
          <div class>
            <h4 class="font-13 text-muted text-uppercase mb-1"
              >Fecha de Cumpleanos:</h4
            >
            <p class="mb-3">{{ clienteSeleccionado.fechaNacimiento }}</p>

            <h4 class="font-13 text-muted text-uppercase mb-1">Telefono :</h4>
            <p class="mb-3">{{ clienteSeleccionado.telefono }}</p>

            <h4 class="font-13 text-muted text-uppercase mb-1"
              >Direccion de residencia :</h4
            >
            <p class="mb-3">{{ clienteSeleccionado.direccion }}</p>

            <h4 class="font-13 text-muted text-uppercase mb-1">Email :</h4>
            <p class="mb-0">{{ clienteSeleccionado.correoElectronico }}</p>
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
      @hidden="hideModal"
    >
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nombres</label>
          <input
            id="name"
            v-model="cliente.nombres"
            type="text"
            class="form-control"
            placeholder="Ingresar nombres"
            :class="{ 'is-invalid': submitted && $v.cliente.nombres.$error }"
          />
          <div
            v-if="submitted && !$v.cliente.nombres.required"
            class="invalid-feedback"
            >El campo nombres es requerido</div
          >
        </div>
        <div class="form-group">
          <label for="apellidos">Apellidos</label>
          <input
            id="apellidos"
            v-model="cliente.apellidos"
            type="text"
            class="form-control"
            placeholder="Ingresar Apellidos"
            :class="{ 'is-invalid': submitted && $v.cliente.apellidos.$error }"
          />
          <div
            v-if="submitted && !$v.cliente.apellidos.required"
            class="invalid-feedback"
            >El campo apellidos es requerido</div
          >
        </div>

        <div class="form-group">
          <label for="sexo">Sexo</label>
          <multiselect
            v-model="cliente.sexo"
            :options="sexoOpciones"
            placeholder="Seleccionar Sexo"
          ></multiselect>

          <div
            v-if="submitted && !$v.contacts.sexo.required"
            class="invalid-feedback"
            >El campo sexo es requerido</div
          >
        </div>

        <div class="form-group">
          <label for="fechaNacimiento">Fecha de Nacimiento</label>
          <date-picker
            v-model="cliente.fechaNacimiento"
            format="DD-MM-YYYY"
            value-type="format"
            lang="es"
          ></date-picker>
        </div>

        <div class="form-group">
          <label for="dui">DUI</label>
          <input
            v-model="cliente.dui"
            v-mask="'########-#'"
            type="text"
            class="form-control"
            placeholder="Ingresar DUI"
          />
        </div>

        <div class="form-group">
          <label for="nit">NIT</label>
          <input
            v-model="cliente.nit"
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
            v-model="cliente.direccion"
            type="text"
            class="form-control"
            placeholder="Ingresar Direccion"
          />
        </div>
        <div class="form-group">
          <label for="telefono">Telefono</label>
          <input
            v-model="cliente.telefono"
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
            v-model="cliente.email"
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
    <b-modal
      id="modificar-modal"
      title="Modificar Cliente"
      header-bg-variant="dark"
      header-close-variant="light"
      title-class="text-light font-18"
      hide-footer
      @hidden="hideModal"
    >
      <form @submit.prevent="modificarCliente">
        <div class="form-group">
          <label for="name">Nombres</label>
          <input
            id="name"
            v-model="cliente.nombres"
            type="text"
            class="form-control"
            placeholder="Ingresar nombres"
            :class="{ 'is-invalid': submitted && $v.cliente.nombres.$error }"
          />
          <div
            v-if="submitted && !$v.cliente.nombres.required"
            class="invalid-feedback"
            >El campo nombres es requerido</div
          >
        </div>
        <div class="form-group">
          <label for="apellidos">Apellidos</label>
          <input
            id="apellidos"
            v-model="cliente.apellidos"
            type="text"
            class="form-control"
            placeholder="Ingresar Apellidos"
            :class="{ 'is-invalid': submitted && $v.cliente.apellidos.$error }"
          />
          <div
            v-if="submitted && !$v.cliente.apellidos.required"
            class="invalid-feedback"
            >El campo apellidos es requerido</div
          >
        </div>

        <div class="form-group">
          <label for="sexo">Sexo</label>
          <multiselect
            v-model="cliente.sexo"
            :options="sexoOpciones"
            placeholder="Seleccionar Sexo"
          ></multiselect>
          <div
            v-if="submitted && !$v.contacts.sexo.required"
            class="invalid-feedback"
            >El campo sexo es requerido</div
          >
        </div>

        <div class="form-group">
          <label for="fechaNacimiento">Fecha de Nacimiento</label>
          <date-picker
            v-model="cliente.fechaNacimiento"
            format="DD-MM-YYYY"
            value-type="format"
            lang="es"
          ></date-picker>
        </div>

        <div class="form-group">
          <label for="dui">DUI</label>
          <input
            v-model="cliente.dui"
            v-mask="'########-#'"
            type="text"
            class="form-control"
            placeholder="Ingresar DUI"
          />
        </div>

        <div class="form-group">
          <label for="nit">NIT</label>
          <input
            v-model="cliente.nit"
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
            v-model="cliente.direccion"
            type="text"
            class="form-control"
            placeholder="Ingresar Direccion"
          />
        </div>
        <div class="form-group">
          <label for="telefono">Telefono</label>
          <input
            v-model="cliente.telefono"
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
            v-model="cliente.email"
            type="email"
            name="email"
            class="form-control"
            placeholder="Enter email"
          />
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-success">Modificar</button>
          <b-button class="ml-1" variant="danger" @click="hideModal"
            >Cancelar</b-button
          >
        </div>
      </form>
    </b-modal>
  </Layout>
</template>
