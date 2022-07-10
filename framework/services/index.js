import Airports from './users.service';

const api = () => ({
  Airports: () => ({ ...Airports}),
});

export default api;
