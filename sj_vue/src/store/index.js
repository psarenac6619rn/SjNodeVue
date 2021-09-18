import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stolice : [],
        drvo: [],
        member:[],
        user : {},
    },
    mutations: {
        setUser: function(state, user) {
            state.user = user;
        },

        removeUser: function(state) {
            state.user = {};
        },

        set_stolice : function (state, stolice) {
            state.stolice = stolice;
        },
        add_member: function (state, member) {
            state.members.push(member);
        },

        add_stolice: function (state, stolice) {
            state.stolice.push(stolice);
        },

        add_drvo: function (state, drvo) {
            state.drvo.push(drvo);
        },

        remove_stolice: function (state, id) {
            for(let i = 0; i < state.stolice.length; i++){
                if(state.stolice[i].id === id){
                    state.stolice.splice(i, 1);
                    break;
                }
            }
        },
        remove_member: function (state, id) {
            for(let i = 0; i < state.member.length; i++){
                if(state.member[i].id === id){
                    state.member.splice(i, 1);
                    break;
                }
            }
        },
        remove_drvo: function (state, id) {
            for(let i = 0; i < state.drvo.length; i++){
                if(state.drvo[i].id === id){
                    state.drvo.splice(i, 1);
                    break;
                }
            }
        },

        update_stolice: function (state, payLoad) {
            for(let i = 0; i < state.stolice.length; i++){
                if(state.stolice[i].id === parseInt(payLoad.msg.id)){
                    state.stolice[i].model = payLoad.msg.ime;
                    state.stolice[i].dimenzija = payLoad.msg.dimenzija;
                    state.stolice[i].cena = payLoad.msg.cena;
                    break;
                }
            }
        }
    },
    actions: {
        login: function({ commit }, user) {
            fetch("http://localhost:800/api/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    password1: user.password1,
                }),
            })
                .then((response) => {
                    if (!response.ok) throw response;

                    return response.json();
                })
                .then((jsonData) => {
                    commit("setUser", jsonData);
                })
                .catch((error) => {
                    if (typeof error.text === "function")
                        error.text().then((errorMessage) => {
                            console.log(errorMessage);
                        });
                    else console.log(error);
                });
        },

        logout: function({ commit }) {
            commit("removeUser");
        },

        load_members: function ({ commit }){
            fetch('http://localhost:8080/ispitskripte/projekat_user', { method: 'get' }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('set_members', jsonData)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },

        load_stolice: function ({ commit }){
            fetch('http://localhost:8080/ispitskripte/projekat_stolice', { method: 'get' }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('set_members', jsonData)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },

        delete_member: function({ commit }, id) {
            fetch(`http://localhost:800/api/members/${id}`, { method: 'delete' }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('remove_member', jsonData.id)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },
        delete_stolice: function({ commit }, id) {
            fetch(`http://localhost:800/api/projekat_stolice/${id}`, { method: 'delete' }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('remove_stolice', jsonData.id)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },
        delete_drvo: function({ commit }, id) {
            fetch(`http://localhost:800/api/projekat_drvo/${id}`, { method: 'delete' }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('remove_drvo', jsonData.id)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },

        new_member: function({ commit }, members) {
            fetch('http://localhost:800/api/projekat_user', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: members
            }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json();
            }).then((jsonData) => {
                commit('add_member', jsonData);
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },
        new_stolica: function({ commit }, members) {
            fetch('http://localhost:800/api/projekat_stolica', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: members
            }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json();
            }).then((jsonData) => {
                commit('add_stolica', jsonData);
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },

        new_drvo: function({ commit }, members) {
            fetch('http://localhost:800/api/projekat_drvo', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: members
            }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json();
            }).then((jsonData) => {
                commit('add_drvo', jsonData);
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },

        change_member: function({ commit }, payload) {
            fetch(`http://localhost:800/api/members/${payload.id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: payload.msg
            }).then((response) => {
                if (!response.ok){
                    throw response;
                }

                return response.json();
            }).then((jsonData) => {
                commit('update_member', {msg:jsonData});
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        }
    }
})