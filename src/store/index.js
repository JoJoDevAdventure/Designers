import { proxy } from 'valtio';

const state = proxy ({
    auth: false,
    name: "Joseph",
    isOnDownload: false,
    isOnUpload: false,
    designerEmail: "",
});

export default state;