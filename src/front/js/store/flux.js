const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			tokenUser: null,
			message: null,
			profile: null,
			status: null,

			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			register: async (newUser) => {
				try {
				  const resp = await fetch(
					process.env.BACKEND_URL + "/api/signup",
					{
					  method: "POST",
					  headers: {
						"Content-Type": "application/json",
					  },
					  body: JSON.stringify(newUser),
					}
				  );
				  const data = await resp.json();
		
				  setStore({ profile: data.newUser, token: data.token });
				  localStorage.setItem("token", data.token);
		
				  return true;
				} catch (error) {
				  console.log("Error loading message from backend", error);
				  return false;
				}
			  },

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded, synching the session storage token");
				if (token && token !="" && token != undefined) setStore({ token: token }); 
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Login out");
				window.location.reload(false);
				setStore({ token: null }); 
			},

			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};

				try {
					const resp = await fetch('https://ubiquitous-parakeet-547ggg7vxqrh9v6-3001.app.github.dev/api/token', opts)
					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}

					const data = await resp.json();
					console.log("this came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });

					return true;
				}
				catch(error) {
					console.error("There has been some error");
				}
				
			},

			getProfile: async () => {
				let store = getStore();
		
				if (store.profile && !store.profile.msg) return;
				try {
				  const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
					method: "GET",
					headers: {
					  "Content-Type": "application/json",
					  Authorization: "Bearer " + store.token,
					},
				  });
				  if (resp.status == 401) {
					setStore({ profile: null, token: null });
					return;
				  }
				  const data = await resp.json();
				  setStore({ profile: data, token: store.token });
				} catch (error) {
				  console.log("Error loading message from backend", error);
				}
			  },


			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}

				try {
					// fetching data from the backend
					const resp = await fetch("https://ubiquitous-parakeet-547ggg7vxqrh9v6-3001.app.github.dev/api/hello", opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getStatus: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}

				try {
					// fetching data from the backend
					const resp = await fetch("https://ubiquitous-parakeet-547ggg7vxqrh9v6-3001.app.github.dev/api/hello", opts)
					const data = await resp.json()
					setStore({ status: data.status })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
