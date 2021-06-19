import {NotificationContainer, NotificationManager} from 'react-notifications';


// 
const Flash = (type,message,title,dismiss,callback) => {
      switch (type) {
        case 'info':
          NotificationManager.info(message,title,dismiss,callback?callback():null);
          break;
        case 'success':
          NotificationManager.success(message,title,dismiss,callback?callback():null);
          break;
        case 'warning':
          NotificationManager.warning(message,title,dismiss,callback?callback():null);
          break;
        case 'error':
          NotificationManager.error(message,title,dismiss,callback?callback():null);
          break;
      }
  };

  export default Flash;