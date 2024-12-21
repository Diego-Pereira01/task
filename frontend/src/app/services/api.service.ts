import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async registerUser(user: { name: string; email: string; password: string }): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/register', user);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async loginUser(credentials: { email: string; password: string }): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getData(endpoint: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}