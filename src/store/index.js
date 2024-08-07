import { proxy } from 'valtio';

const state = proxy ({
    auth: false,
    name: "Joseph",
    isOnDownload: false,
    isOnUpload: false,

});

export default state;