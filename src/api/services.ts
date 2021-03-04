import GlucoseService from './glucoseService';

const createServices = () => ({
    glucoseService: new GlucoseService(),
});

export default createServices;