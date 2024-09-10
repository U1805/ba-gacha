import vueEsign from '../components/SignBoard.vue'
vueEsign.install = function (Vue:any) {
  if (this.installed) {
    return
  }
  this.installed = true
  Vue.component('vueEsign', vueEsign)
}
export default vueEsign