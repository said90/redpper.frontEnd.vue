<script>
import countTo from 'vue-count-to'
import DatePicker from 'vue2-datepicker'

import appConfig from '@src/app.config'
import Layout from '@layouts/main'

import {
  widgetData,
  revenueRadialChart,
  salesMixedChart,
  userBalanceData,
  revenueData,
} from './data'

/**
 * Dashboard-1 Component
 */
export default {
  page: {
    title: 'Dashboard',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { countTo, DatePicker, Layout },
  data() {
    return {
      widgetData: widgetData,
      salesMixedChart: salesMixedChart,
      revenueRadialChart: revenueRadialChart,
      userBalanceData: userBalanceData,
      revenueData: revenueData,
      title: 'Dashboard',
      items: [
        {
          text: 'Ubold',
          href: '/',
        },
        {
          text: 'Dashboard',
          active: true,
        },
      ],
      state: {
        date: new Date(),
      },
    }
  },
}
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <form class="form-inline">
              <div class="form-group">
                <div class="input-group input-group-sm">
                  <date-picker
                    v-model="state.date"
                    :first-day-of-week="1"
                    lang="en"
                    class="border-white"
                  ></date-picker>
                </div>
              </div>
              <a href="javascript: void(0);" class="btn btn-blue btn-sm ml-2">
                <i class="mdi mdi-autorenew"></i>
              </a>
              <a href="javascript: void(0);" class="btn btn-blue btn-sm ml-1">
                <i class="mdi mdi-filter-variant"></i>
              </a>
            </form>
          </div>
          <h4 class="page-title">Dashboard</h4>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="widget in widgetData" :key="widget.value" class="col-md-6 col-xl-3">
        <div class="widget-rounded-circle card-box">
          <div class="row">
            <div class="col-6">
              <div
                :class="`avatar-lg rounded-circle bg-soft-${widget.color} border-${widget.color} border`"
              >
                <i :class="`${ widget.icon } font-22 avatar-title text-${ widget.color}`"></i>
              </div>
            </div>
            <div class="col-6">
              <div class="text-right">
                <h3 class="text-dark mt-1">
                  <span>
                    <countTo :end-val="widget.value" :duration="3000"></countTo>
                  </span>
                </h3>
                <p class="text-muted mb-1 text-truncate">{{ widget.text }}</p>
              </div>
            </div>
          </div>
          <!-- end row-->
        </div>
        <!-- end widget-rounded-circle-->
      </div>
      <!-- end col-->
    </div>
    <div class="row">
      <div class="col-xl-4">
        <div class="card-box">
          <h4 class="header-title mb-1">Total Revenue</h4>
          <div class="widget-chart text-center" dir="ltr">
            <apexchart
              type="radialBar"
              height="200"
              :options="revenueRadialChart.chartOptions"
              :series="revenueRadialChart.series"
            ></apexchart>
            <h5 class="text-muted">Total sales made today</h5>
            <h2>$178</h2>

            <p
              class="text-muted w-75 mx-auto sp-line-2"
            >Traditional heading elements are designed to work best in the meat of your page content.</p>

            <div class="row mt-3">
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                <h4>
                  <i class="fe-arrow-down text-danger mr-1"></i>$7.8k
                </h4>
              </div>
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                <h4>
                  <i class="fe-arrow-up text-success mr-1"></i>$1.4k
                </h4>
              </div>
              <div class="col-4">
                <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                <h4>
                  <i class="fe-arrow-down text-danger mr-1"></i>$15k
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <div class="card-box pb-1">
          <h4 class="header-title mb-3">Sales Analytics</h4>
          <!-- sales analytics chart -->
          <div style="height: 375px;">
            <apexchart
              height="370"
              type="line"
              :options="salesMixedChart.chartOptions"
              :series="salesMixedChart.series"
            ></apexchart>
          </div>
          <!-- end chart -->
        </div>
        <!-- end card-box -->
      </div>
      <!-- end col-->
    </div>
    <div class="row">
      <div class="col-xl-6">
        <div class="card-box">
          <h4 class="header-title mb-3">Top 5 Users Balances</h4>

          <div class="table-responsive mb-0">
            <table class="table table-borderless table-hover table-centered m-0">
              <thead class="thead-light">
                <tr>
                  <th colspan="2">Profile</th>
                  <th>Currency</th>
                  <th>Balance</th>
                  <th>Reserved in orders</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in userBalanceData" :key="user.name">
                  <td style="width: 36px;">
                    <img
                      :src="`${user.image}`"
                      alt="contact-img"
                      title="contact-img"
                      class="rounded-circle avatar-sm"
                    />
                  </td>
                  <td>
                    <h5 class="m-0 font-weight-normal">{{ user.name }}</h5>
                    <p class="mb-0 text-muted">
                      <small>Member Since 2017</small>
                    </p>
                  </td>
                  <td>
                    <i :class="`${ user.icon } text-primary`"></i>
                    {{ user.currency }}
                  </td>
                  <td>{{ user.balance }}</td>
                  <td>{{ user.order }}</td>
                  <td>
                    <a href="javascript: void(0);" class="btn btn-xs btn-light">
                      <i class="mdi mdi-plus"></i>
                    </a>
                    <a href="javascript: void(0);" class="btn btn-xs btn-danger">
                      <i class="mdi mdi-minus"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="card-box">
          <h4 class="header-title mb-3">Revenue History</h4>
          <div class="table-responsive mb-0">
            <table class="table table-borderless table-hover table-centered m-0">
              <thead class="thead-light">
                <tr>
                  <th>Marketplaces</th>
                  <th>Date</th>
                  <th>Payouts</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in revenueData" :key="data.date">
                  <td>
                    <h5 class="m-0 font-weight-normal">{{ data.marketplaces }}</h5>
                  </td>
                  <td>{{ data.date }}</td>
                  <td>{{ data.payout }}</td>
                  <td>
                    <span
                      :class="{ 'bg-soft-success text-success': (`${data.status}` === 'Paid'),
                    'bg-soft-warning text-warning': (`${data.status}` === 'Upcoming'),
                    'bg-soft-danger  text-danger': (`${data.status}` === 'Overdue') }"
                      class="badge"
                    >{{ data.status }}</span>
                  </td>
                  <td>
                    <a href="javascript: void(0);" class="btn btn-xs btn-secondary">
                      <i class="mdi mdi-pencil"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end .table-responsive-->
        </div>
      </div>
    </div>
  </Layout>
</template>
