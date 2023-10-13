
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { HTTP_METHOD, HTTP_STATUS } from '@enums/HTTP';

const instanceAxios = axios.create({
    method: HTTP_METHOD.GET,
    headers: {
        Authorization: 'Bearer ' + STRAPI_API_TOKEN
    }
})