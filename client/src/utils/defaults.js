export const DEFAULT_STARTUP_DATA = {
  name: "Test Startup",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  location: "India",
  industry: "Information Technology",
  foundedOn: new Date().toISOString().slice(0, 10),
  tags: ["Test tag 1", "Test tag 2", "Test tag 3"],
  founders: ["Test founder 1", "Test founder 2"],
  investors: ["Test investor 1", "Test investor 2"],
  teamSize: 20,
  funding: 10000000,
  website: "www.myteststartup.com",
  featuredImage: null,
  galleryImages: [],
  status: "OPEN",
};

export const DEFAULT_SIGNUP_DATA = {
  email: "testemail@test.com",
  password: "test123",
  name: "Vatsal Patel",
  role: "entrepreneur",
  location: "Surat, Gujarat",
  phoneNumber: "9999999999",
};
