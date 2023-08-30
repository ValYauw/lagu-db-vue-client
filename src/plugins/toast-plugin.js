// Vue Toast Notification
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toastPlugin = (context) => { 
  return {
    $toast: useToast(),
    $fireSuccessMessage: (message) => {
      context.store.$toast.open({
        message,
        duration: 5000
      })
    },
    $fireErrorMessage: (err) => {
      const res = err?.response?.data;
      let message = res ? res.message : err.message;
      if (res && res.errors) {
        message += `<ul>${res.errors.map(el => `<li>${el}</li>`).join('')}</ul>`;
      }
      context.store.$toast.open({
        message,
        type: 'error',
        duration: 5000
      });
    }
  } 
}

export default toastPlugin;