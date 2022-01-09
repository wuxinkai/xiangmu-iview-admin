import axios from '@/utils/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }

  console.log(444,axios);
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'account/userinfo',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'account/logout',
    method: 'post'
  })
}
