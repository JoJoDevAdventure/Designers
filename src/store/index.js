import { proxy } from 'valtio';

const state = proxy ({
    auth: false,
    name: "",
    isOnDownload: false,
    isOnUpload: false,
    designerEmail: "",
});

export default state;