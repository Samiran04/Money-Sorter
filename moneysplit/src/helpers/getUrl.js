const APIRoot = "http://localhost:8000/api/v1";

export const APIUrls = {
  login: () => `${APIRoot}/users/create-session`,
  signup: () => `${APIRoot}/users/create`,
  createNewTrip: () => `${APIRoot}/trips/create`,
  createNewUser: () => `${APIRoot}/trips/create-user`,
  apiFetchTripList: (email) =>
    `${APIRoot}/trips/fetch-trip-list/?email=${email}`,
};
