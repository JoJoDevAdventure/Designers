import { proxy } from 'valtio';

const state = proxy ({
    auth: false,
    name: "Joseph",
});

export default state;