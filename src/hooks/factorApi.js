import axios from "axios"
import { API_URL } from "./factorUtils"

export const fetchFactors = () =>
    axios.get(API_URL).then(res => res.data)

export const postFactor = (factor) => {
    const { id, ...body } = factor
    return axios.post(API_URL, body).then(res => res.data)
}

export const putFactor = (factor) =>
    axios.put(`${API_URL}/${factor.id}`, factor)

export const deleteFactorById = (id) =>
    axios.delete(`${API_URL}/${id}`)
